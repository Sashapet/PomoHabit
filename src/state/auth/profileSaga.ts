import { call, put, select, takeLatest } from 'redux-saga/effects';

import { profileApi } from '../../api/ProfileApi';
import { actions } from '../actions';
import { constants } from '../constants';

function* handleUploadImage(data: { type: string; payload: string }) {
  const { payload } = data;
  const imageUri = payload;
  const userId: string = yield select(state => state.auth.userInfo.userId);
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'imageUpload' }));
    const imageUrl: string = yield call(
      profileApi.uploadImage,
      imageUri,
      userId,
    );
    yield call(profileApi.setProfilePhoto, imageUrl, userId);
    yield put(
      actions.messages.success({
        type: 'success',
        message: 'Photo was updated!',
      }),
    );
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'imageUpload' }));
  }
}

function* updateUserName(data: {
  type: string;
  payload: { firstname: string; lastname: string };
}) {
  const { payload } = data;
  const firstname = payload.firstname;
  const lastname = payload.lastname;
  const userId: string = yield select(state => state.auth.userInfo.userId);
  const currentFirstName: string = yield select(
    state => state.auth.userInfo.firstname,
  );
  const currentLastName: string = yield select(
    state => state.auth.userInfo.lastname,
  );
  try {
    yield put(
      actions.theme.setOnSync({ loading: true, type: 'updateUserName' }),
    );
    yield call(
      profileApi.updateUserName,
      firstname,
      lastname,
      userId,
      currentFirstName,
      currentLastName,
    );
    yield put(
      actions.messages.success({
        type: 'success',
        message: 'Name have been updated!',
      }),
    );
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(
      actions.theme.setOnSync({ loading: false, type: 'updateUserName' }),
    );
  }
}

export default function* profileSaga() {
  yield takeLatest(constants.auth.UPLOAD_IMAGE, handleUploadImage);
  yield takeLatest(constants.auth.UPDATE_USER_NAME, updateUserName);
}
