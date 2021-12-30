import { all, fork } from 'redux-saga/effects';

import authSaga, { watchForFirebaseAuth } from './auth/authSaga';
import pomodoroSaga from './pomodoro/pomodoroSaga';
import tasksSaga from './tasks/tasksSaga';
import searchSaga from './search/searchSaga';
import followSaga from './follow/followSaga';
import postsSaga from './posts/postsSaga';
import profileSaga from './auth/profileSaga';
import likesSaga from './posts/likesSaga';

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(watchForFirebaseAuth),
    fork(pomodoroSaga),
    fork(tasksSaga),
    fork(searchSaga),
    fork(followSaga),
    fork(postsSaga),
    fork(profileSaga),
    fork(likesSaga),
  ]);
}
