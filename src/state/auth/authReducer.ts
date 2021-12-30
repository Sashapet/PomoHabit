import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

export const initialState: AuthReducerState = {
  user: false,
  userInfo: {
    firstname: null,
    lastname: null,
    avatar: null,
    userId: null,
  },
  showLogOutModal: false,
};
interface IUserInfo {
  firstname: string;
  lastname: string;
  avatar: string;
  userId: string;
}
export interface AuthReducerState {
  user: boolean;
  userInfo: IUserInfo;
  showLogOutModal: boolean;
}

const AuthReducer = createReducer(initialState, {
  [constants.auth.USER_STATE_CHANGED]: (state, action) => {
    state.user = action.payload;
  },
  [constants.auth.SHOW_LOG_OUT_MODAL]: (state, action) => {
    state.showLogOutModal = action.payload;
  },
  [constants.auth.UPDATE_USER_INFO]: (state, action) => {
    state.userInfo = action.payload;
  },
  [constants.auth.CLEAN_USER]: () => initialState,
});

export default AuthReducer;
