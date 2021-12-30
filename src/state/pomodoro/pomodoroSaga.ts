import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import { eventChannel, EventChannel } from 'redux-saga';

import { pomodoroApi } from '../../api/PomodoroApi';
import { PostProps } from '../../types/PomodoroTypes';
import { PomodoroReducerState } from './pomodoroReducer';
import { actions } from '../actions';
import { constants } from '../constants';

const pomodoroChannel = async (uid: string) => {
  const db = database().ref(`pomodoroSettings/${uid}`);
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
    return () => db.off();
  });
};
export function* watchPomodoro(uid: string) {
  const channel: EventChannel<PomodoroReducerState> = yield call(
    pomodoroChannel,
    uid,
  );
  try {
    while (true) {
      const { data } = yield take(channel);
      const newObj = { ...data };
      delete newObj.userId;
      yield put(actions.pomodoro.updatePomodoroState(newObj));
    }
  } catch (e) {
    console.tron.log(e.message);
  } finally {
    channel.close();
  }
}
function* watchPomodoroDispatch() {
  const userId: string = yield select(state => state.auth.user.uid);
  if (userId) {
    yield fork(watchPomodoro, userId);
  }
}

function* pomodoroPost(data: { type: string; payload: PostProps }) {
  const { payload } = data;
  const { style, sessions, time, title, description } = payload;
  const userId: string = yield select(state => state.auth.user.uid);
  const followedBy: Array<{ userId: string }> = yield select(
    state => state.follow.follow.followedBy,
  );
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'post' }));
    yield call(
      pomodoroApi.addPost,
      { style, sessions, time, title, description },
      userId,
      followedBy,
    );
    yield put(actions.pomodoro.resetTimer(true));
    //clean
    yield put(actions.pomodoro.setWorking(false));
    yield put(actions.pomodoro.setFinishTime({ min: null, sec: null }));
    yield put(actions.pomodoro.finish(false));
    yield put(actions.pomodoro.changeButton(true));
    yield put(actions.pomodoro.cleanSessions());
    yield put(
      actions.messages.success({
        type: 'success',
        message: 'Post have been posted!',
      }),
    );
  } catch (e) {
    console.tron.log(e.message);
    yield put(
      actions.messages.error({
        type: 'error',
        message: e.message,
      }),
    );
  } finally {
    yield put(actions.pomodoro.setPosted(true));
    yield put(actions.theme.setOnSync({ loading: false, type: 'post' }));
  }
}

function* editPomodoro(data: {
  type: string;
  payload: { pomodoros: number; shortBreak: number };
}) {
  const { payload } = data;
  const { pomodoros, shortBreak } = payload;
  const userId: string = yield select(state => state.auth.user.uid);
  const oldPomodoros: number = yield select(
    state => state.pomodoro.pomodoroState.pomodoros,
  );
  const oldShortBreak: number = yield select(
    state => state.pomodoro.pomodoroState.shortBreak,
  );
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'editPomodoro' }));
    yield call(
      pomodoroApi.editPomodoro,
      { pomodoros, shortBreak },
      { oldPomodoros, oldShortBreak },
      userId,
    );
    yield put(
      actions.messages.success({
        type: 'success',
        message: 'Timer have been edited!',
      }),
    );
  } catch (e) {
    console.tron.log(e.message);
    yield put(
      actions.messages.error({
        type: 'error',
        message: e.message,
      }),
    );
  } finally {
    yield put(
      actions.theme.setOnSync({ loading: false, type: 'editPomodoro' }),
    );
  }
}

export default function* pomodoroSaga() {
  yield takeLatest(
    constants.pomodoro.CONNECT_POMODORO_STATE,
    watchPomodoroDispatch,
  );
  yield takeLatest(constants.pomodoro.POST, pomodoroPost);
  yield takeLatest(constants.pomodoro.EDIT_POMODORO, editPomodoro);
}
