import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import database from '@react-native-firebase/database';
import { eventChannel, EventChannel } from 'redux-saga';

import { actions } from '../actions';
import { constants } from '../constants';
import { Api } from '../../api/Api';

function* createTask(data: { type: string; payload: string }) {
  const { payload } = data;
  const title = payload;
  const userId: string = yield select(state => state.auth.user.uid);
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'createTask' }));
    yield call(Api.createTask, title, userId);
    yield put(actions.tasks.showCreateModal(false));
    yield put(
      actions.messages.success({
        type: 'success',
        message: 'Task have been created!',
      }),
    );
  } catch (e) {
    console.tron.log(e.message);
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'createTask' }));
  }
}
function* updateTask(data: {
  type: string;
  payload: { taskId: string; title: string };
}) {
  const { payload } = data;
  const userId: string = yield select(state => state.auth.user.uid);
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'updateTask' }));
    yield call(Api.updateTask, payload.title, userId, payload.taskId);
    yield put(
      actions.tasks.selectTask({
        taskId: payload.taskId,
        title: payload.title,
      }),
    );
    yield put(
      actions.tasks.showUpdateModal({ show: false, task: null, taskId: null }),
    );
    yield put(
      actions.messages.success({
        type: 'success',
        message: 'Task have been updated!',
      }),
    );
  } catch (e) {
    console.tron.log(e.message);
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'updateTask' }));
  }
}

function* deleteTask(data: { type: string; payload: string }) {
  const { payload } = data;
  const taskId = payload;
  const userId: string = yield select(state => state.auth.user.uid);
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'deleteTask' }));
    yield call(Api.deleteTask, taskId, userId);
    yield put(
      actions.tasks.showUpdateModal({ show: false, task: null, taskId: null }),
    );
    yield put(
      actions.tasks.selectTask({
        taskId: null,
        title: null,
      }),
    );
    yield put(
      actions.messages.success({
        type: 'success',
        message: 'Task have been deleted!',
      }),
    );
  } catch (e) {
    console.tron.log(e.message);
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'deleteTask' }));
  }
}

const tasksChannel = async (uid: string) => {
  const db = database().ref(`tasks/${uid}`).orderByChild('timestamp');
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
export function* watchTasks(uid: string) {
  const channel: EventChannel<{ title: string; timestamp: string }> =
    yield call(tasksChannel, uid);
  try {
    while (true) {
      const { data } = yield take(channel);
      const tasksArray = [];
      for (const i in data) {
        tasksArray.push(data[i]);
      }
      yield put(actions.tasks.updateTasksState(tasksArray));
    }
  } catch (e) {
    console.tron.log(e.message);
  } finally {
    channel.close();
  }
}
function* watchTasksDispatch() {
  const userId: string = yield select(state => state.auth.user.uid);
  if (userId) {
    yield fork(watchTasks, userId);
  }
}

export default function* tasksSaga() {
  yield takeLatest(constants.tasks.CREATE_TASK, createTask);
  yield takeLatest(constants.tasks.UPDATE_TASK, updateTask);
  yield takeLatest(constants.tasks.DELETE_TASK, deleteTask);
  yield takeLatest(constants.tasks.CONNECT_TASKS_STATE, watchTasksDispatch);
}
