import { call, put, select, takeLeading } from 'redux-saga/effects';

import { UserProps } from '../../types/authTypes';
import { PostProps } from '../../types/postTypes';
import { postsApi } from '../../api/PostsApi';
import { actions } from '../actions';
import { constants } from '../constants';
import { likesApi } from '../../api/LikesApi';

interface PostIdDataProps {
  lastKey: string;
  formatedArray: Array<{ createdAt: Date; postId: string; postKey: string }>;
  firstKey: string;
}
interface PostIdRefeshIdProps {
  sortedArray: Array<{ createdAt: Date; postId: string; postKey: string }>;
  firstKey: string;
  lastSeenKey: string;
}

function* fetchPosts() {
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'fetchPosts' }));
    const userId: string = yield select(state => state.auth.user.uid);
    //GET POSTS ID
    const postIdData: PostIdDataProps = yield call(
      postsApi.fetchPostsIds,
      userId,
    );
    const { formatedArray, lastKey, firstKey } = postIdData;
    //IF NO POSTS
    if (formatedArray.length < 1) {
      yield put(actions.posts.setPosts(null));
    } else {
      //IF ARRAY LESS THAN 3, BLOCK NEXT UDPATE
      if (formatedArray.length < 3) {
        yield put(actions.posts.canBeUpdated(false));
      }
      //IF POSTS, ATTACH POST DATA
      const posts: Array<PostProps> = yield call(
        postsApi.fetchPosts,
        formatedArray,
      );

      //ATTACH USERS TO POSTS
      const newPostsArray: Array<PostProps> = yield call(
        attachUsersAndLikes,
        posts,
      );

      yield put(actions.posts.setFirstSeenKey(firstKey));

      yield put(actions.posts.setLastSeenKey(lastKey));

      yield put(actions.posts.setPosts(newPostsArray));
    }
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'fetchPosts' }));
  }
}

function* loadNewPosts() {
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'loadNewPosts' }));
    const userId: string = yield select(state => state.auth.user.uid);
    const lastSeenKey: string = yield select(state => state.posts.lastSeenKey);
    const oldPostsArray: Array<PostProps> = yield select(
      state => state.posts.posts,
    );
    //GET POSTS ID
    const postIdData: PostIdDataProps = yield call(
      postsApi.loadnewPostsIds,
      userId,
      lastSeenKey,
    );
    const { formatedArray, lastKey } = postIdData;
    //IF POSTS, ATTACH POST DATA
    if (formatedArray.length > 0) {
      const posts: Array<PostProps> = yield call(
        postsApi.fetchPosts,
        formatedArray,
      );
      //IF ARRAY LESS THAN 3, BLOCK NEXT UDPATE
      if (formatedArray.length < 3) {
        yield put(actions.posts.canBeUpdated(false));
      }
      let newPostsArray: Array<PostProps> = [];
      //IF RETURN 1, CHECK IF IT DOESN'T EXIST ON ARRAY ALREADY (NUMBER OF POSTS ARE N%3=0)
      if (formatedArray.length === 1) {
        const findPost = oldPostsArray.find(
          post => post.postId === formatedArray[0].postId,
        );
        if (findPost) {
          newPostsArray = [];
        }
      } else {
        newPostsArray = yield call(attachUsersAndLikes, posts);
        //CONCAT ARRAY
        const appendedArray = oldPostsArray.concat(newPostsArray);

        //SET LAST SEEN POST KEY
        yield put(actions.posts.setLastSeenKey(lastKey));
        // //SET POSTS
        yield put(actions.posts.setPosts(appendedArray));
      }
    } else {
      yield put(actions.posts.canBeUpdated(false));
    }
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(
      actions.theme.setOnSync({ loading: false, type: 'loadNewPosts' }),
    );
  }
}

function* refreshPosts() {
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'refresh' }));
    const userId: string = yield select(state => state.auth.user.uid);
    const firstSeenKey: string = yield select(
      state => state.posts.firstSeenKey,
    );
    const oldPostsArray: Array<PostProps> = yield select(
      state => state.posts.posts,
    );
    if (firstSeenKey) {
      //GET POSTS ID
      const postIdData: PostIdRefeshIdProps = yield call(
        postsApi.refreshPostsIds,
        userId,
        firstSeenKey,
      );
      let firstKey = null;
      let postIdsArray = null;
      if (postIdData) {
        firstKey = postIdData.firstKey;
        postIdsArray = postIdData.sortedArray;
      }
      if (postIdsArray?.length > 0) {
        const posts: Array<PostProps> = yield call(
          postsApi.fetchPosts,
          postIdsArray,
        );
        console.tron.log(posts);

        // ATTACH USERS
        const newPostsArray: Array<PostProps> = yield call(
          attachUsersAndLikes,
          posts,
        );
        //UPDATE ARRAY
        const appendedArray = newPostsArray.concat(oldPostsArray);

        yield put(actions.posts.setFirstSeenKey(firstKey));

        yield put(actions.posts.setPosts(appendedArray));
      }
    } else {
      yield call(fetchPosts);
    }
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'refresh' }));
  }
}

function* attachUsersAndLikes(posts: Array<PostProps>) {
  //ATTACH USERS TO POSTS
  const newPostsArray = [];
  if (posts) {
    for (const i in posts) {
      //FETCH LIKES COUNT
      const likeCount: number = yield call(likesApi.likeCount, posts[i].postId);
      //SELECT COLLECTED USERS
      const users: Array<UserProps> = yield select(state => state.posts.users);
      //FETCH USER
      const user: UserProps = yield call(
        postsApi.fetchUser,
        posts[i].userId,
        users,
      );
      //COPING ARRAY
      const newUsersArray = [...users];
      //IF USER DOESN'T EXIST APPEND NEW USER
      if (user) {
        const newPostObj = { ...posts[i], user, likeCount };
        newPostsArray.push(newPostObj);
        newUsersArray.push(user);
        yield put(actions.posts.setUsers(newUsersArray));
        //ELSE FIND EXISTING USER FROM USERS LIST
      } else {
        const findUser = users.find(user => user.userId === posts[i].userId);
        if (findUser) {
          const newPostObj = { ...posts[i], user: findUser, likeCount };
          newPostsArray.push(newPostObj);
        }
      }
    }
  }
  return newPostsArray;
}

export default function* postsSaga() {
  yield takeLeading(constants.posts.FETCH_POSTS, fetchPosts);
  yield takeLeading(constants.posts.LOAD_NEW_POSTS, loadNewPosts);
  yield takeLeading(constants.posts.REFRESH, refreshPosts);
}
