import database from '@react-native-firebase/database';
import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { eventChannel, EventChannel } from '@redux-saga/core';

import { PostProps } from '../../types/postTypes';
import { FollowApi } from '../../api/FollowApi';
import { actions } from '../actions';
import { constants } from '../constants';

function* follow(data: { type: string; payload: string }) {
  const { payload } = data;
  const friendUserId = payload;
  const myUserId: string = yield select(state => state.auth.user.uid);
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'follow' }));
    yield call(FollowApi.follow, myUserId, friendUserId);
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'follow' }));
  }
}

function* unFollow(data: { type: string; payload: string }) {
  const { payload } = data;
  const friendUserId = payload;
  const posts: Array<PostProps> = yield select(state => state.posts.posts);

  const myUserId: string = yield select(state => state.auth.user.uid);
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'unFollow' }));
    yield call(FollowApi.unFollow, myUserId, friendUserId);
    if (posts) {
      const newPosts = [...posts];
      const filterdPosts = newPosts.filter(
        post => post.userId !== friendUserId,
      );

      yield put(actions.posts.setPosts(filterdPosts));
    }
    yield call(FollowApi.filterFeed, myUserId, friendUserId);
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'unFollow' }));
  }
}

const followingChannel = async (uid: string) => {
  const db = database().ref(`follow/${uid}`);
  return eventChannel(emit => {
    db.on(
      'value',
      snapshot => {
        emit({ data: snapshot.val() });
      },
      errorObject => {
        console.log(errorObject);
      },
    );
    return () => {
      db.off();
    };
  });
};

function* watchFollowing(userId: string) {
  const channel: EventChannel<Array<{ friendUserId: string }>> = yield call(
    followingChannel,
    userId,
  );
  try {
    while (true) {
      const { data } = yield take(channel);
      const newObj: {
        following: Array<{ userId: string }>;
        followedBy: Array<{ userId: string }>;
      } = {
        following: [],
        followedBy: [],
      };
      if (data?.following) {
        for (const i in data.following) {
          newObj.following.push(data.following[i]);
        }
      }
      if (data?.followedBy) {
        for (const i in data.followedBy) {
          newObj.followedBy.push(data.followedBy[i]);
        }
      }
      yield put(actions.follow.setFollowingUsers(newObj));
    }
  } catch (e) {
    console.tron.log(e.message);
  } finally {
    channel.close();
  }
}

function* listenToFetch() {
  const userId: string = yield select(state => state.auth.user.uid);
  if (userId) {
    yield fork(watchFollowing, userId);
  }
}

export default function* followSaga() {
  yield takeLatest(constants.follow.FOLLOW_USER, follow);
  yield takeLatest(constants.follow.UNFOLLOW_USER, unFollow);
  yield takeLatest(constants.follow.FETCH_FOLLOWING_USERS, listenToFetch);
}
