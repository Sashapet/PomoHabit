import { call, put, select, takeEvery, takeLeading } from 'redux-saga/effects';

import { actions } from '../actions';
import { constants } from '../constants';
import { likesApi } from '../../api/LikesApi';

function* like(data: { type: string; payload: string }) {
  const { payload } = data;
  const postId = payload;
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'like' }));
    const userId: string = yield select(state => state.auth.user.uid);
    // GET POSTS ID
    yield call(likesApi.like, userId, postId);
    yield call(likesApi.addCount, postId);

    yield put(actions.posts.setLikedPosts(postId));
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'like' }));
  }
}

function* checkIfLiked(data: { type: string; payload: string }) {
  const { payload } = data;
  const postId = payload;
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'checkIfLiked' }));
    const userId: string = yield select(state => state.auth.user.uid);
    // GET POSTS ID
    const check: boolean = yield call(likesApi.checkIfLiked, userId, postId);
    if (check) {
      yield put(actions.posts.setLikedPosts(postId));
    }
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(
      actions.theme.setOnSync({ loading: false, type: 'checkIfLiked' }),
    );
  }
}

export default function* likesSaga() {
  yield takeLeading(constants.posts.LIKE, like);
  yield takeEvery(constants.posts.CHECH_IF_LIKED, checkIfLiked);
}
