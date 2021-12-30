import { RootState } from '../reducers';

const auth = (state: RootState) => state.auth;
const user = (state: RootState) => state.auth.user;
const userId = (state: RootState) => state.auth.userInfo.userId;
const userInfo = (state: RootState) => state.auth.userInfo;
const avatar = (state: RootState) => state.auth.userInfo.avatar;
const logOutModal = (state: RootState) => state.auth.showLogOutModal;
export const authSelectors = {
  auth,
  user,
  userId,
  userInfo,
  avatar,
  logOutModal,
};
