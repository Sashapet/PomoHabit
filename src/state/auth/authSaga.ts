import {
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { eventChannel, EventChannel } from 'redux-saga';
import {
  IRecoverProps,
  ISignInProps,
  ISignUpProps,
  IUserProps,
} from '@typings/AuthTypes';

import { avatarUrl } from '../../utils/helpers/avatarUrl';
import { actions } from '../actions';
import { constants } from '../constants';
import { Api } from '../../api/Api';

function* handleLogin(data: { type: string; payload: ISignInProps }) {
  const { payload } = data;
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'login' }));
    yield call(Api.login, payload.email, payload.password);
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'login' }));
  }
}
function* handleLogOut() {
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'logout' }));
    yield call(Api.logout);
    yield put(actions.pomodoro.cleanUp());
    yield put(actions.tasks.cleanUp());
    yield put(actions.messages.cleanUp());
    yield put(actions.search.clean());
    yield put(actions.posts.cleanPosts());
    yield put(actions.follow.cleanUp());
    yield put(actions.auth.cleanUser());
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'logout' }));
  }
}
function* handleSignUp(data: { type: string; payload: ISignUpProps }) {
  const { payload } = data;
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'register' }));
    const userData: FirebaseAuthTypes.UserCredential = yield call(
      Api.singup,
      payload.email,
      payload.password,
    );
    yield call(
      Api.addUser,
      payload.firstname,
      payload.lastname,
      userData.user.uid,
      avatarUrl,
    );
    yield call(
      Api.addPomodoroInfo,
      5, //short break
      25, //pomodoros
      userData.user.uid,
    );
    yield put(
      actions.messages.success({
        type: 'success',
        message: 'You have successfully signed up!',
      }),
    );
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'register' }));
  }
}
function* handleRecoverUser(data: { type: string; payload: IRecoverProps }) {
  const { payload } = data;
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'recover' }));
    yield call(Api.recover, payload.email);
    yield put(
      actions.messages.success({
        type: 'success',
        message: 'Please check your email to reset your password!',
      }),
    );
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'recover' }));
  }
}

const usersChannel = async (uid: string) => {
  const db = database().ref(`users/${uid}`);
  return eventChannel(emit => {
    db.on(
      'value',
      snapshot => {
        emit({ user: snapshot.val() });
      },
      errorObject => {
        console.log(errorObject);
      },
    );
    return () => db.off();
  });
};

export function* watchUser(uid: string) {
  const channel: EventChannel<IUserProps> = yield call(usersChannel, uid);
  try {
    while (true) {
      const { user } = yield take(channel);
      yield put(actions.auth.updateUserInfo(user));
    }
  } catch (e) {
    console.tron.log(e.message);
  }
}

const getAuthChannel = async () =>
  eventChannel(emit => {
    const unsubscribe = auth().onAuthStateChanged(userState => {
      !userState ? emit({ userState: null }) : emit({ userState });
    });
    return unsubscribe;
  });

export function* watchForFirebaseAuth() {
  const channel: EventChannel<FirebaseAuthTypes.User> = yield call(
    getAuthChannel,
  );
  try {
    while (true) {
      const { userState } = yield take(channel);
      yield put(actions.auth.userStateChanged(userState));
      if (userState) {
        yield fork(watchUser, userState.uid);
      }
    }
  } catch (e) {
    console.tron.log(e.message);
  }
}

export default function* authSaga() {
  yield takeLatest(constants.auth.USER_LOGIN, handleLogin);
  yield takeLatest(constants.auth.USER_LOGOUT, handleLogOut);
  yield takeEvery(constants.auth.USER_SIGNUP, handleSignUp);
  yield takeLatest(constants.auth.USER_RECOVER_USER, handleRecoverUser);
}
