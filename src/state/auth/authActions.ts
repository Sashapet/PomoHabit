import {
  IRecoverProps,
  ISignInProps,
  ISignUpProps,
  IUserProps,
} from '@typings/AuthTypes';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { constants } from '../constants';
// SIGN IN
const signIn = (payload: ISignInProps) => ({
  type: constants.auth.USER_LOGIN,
  payload,
});
// USER STATE CHANGED
const userStateChanged = (payload: FirebaseAuthTypes.User) => ({
  type: constants.auth.USER_STATE_CHANGED,
  payload,
});
const uploadImage = (payload: string) => ({
  type: constants.auth.UPLOAD_IMAGE,
  payload,
});

const logOut = () => ({
  type: constants.auth.USER_LOGOUT,
});
const signUp = (payload: ISignUpProps) => ({
  type: constants.auth.USER_SIGNUP,
  payload,
});
const recoverUser = (payload: IRecoverProps) => ({
  type: constants.auth.USER_RECOVER_USER,
  payload,
});
const updateUserInfo = (payload: IUserProps) => ({
  type: constants.auth.UPDATE_USER_INFO,
  payload,
});
const showLogOutModal = (payload: boolean) => ({
  type: constants.auth.SHOW_LOG_OUT_MODAL,
  payload,
});
const cleanUser = () => ({
  type: constants.auth.CLEAN_USER,
});
const updateUserName = (payload: { firstname: string; lastname: string }) => ({
  type: constants.auth.UPDATE_USER_NAME,
  payload,
});

export const authActions = {
  signIn,
  userStateChanged,
  logOut,
  signUp,
  recoverUser,
  updateUserInfo,
  cleanUser,
  uploadImage,
  updateUserName,
  showLogOutModal,
};
