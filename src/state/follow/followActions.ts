import { constants } from '../constants';

const fetchFollowinUsers = () => ({
  type: constants.follow.FETCH_FOLLOWING_USERS,
});
const setFollowingUsers = (payload: {
  following: Array<{ userId: string }>;
  followedBy: Array<{ userId: string }>;
}) => ({
  type: constants.follow.SET_FOLLOWING_USERS,
  payload,
});
const followUser = (payload: string) => ({
  type: constants.follow.FOLLOW_USER,
  payload,
});
const unfollowUser = (payload: string) => ({
  type: constants.follow.UNFOLLOW_USER,
  payload,
});
const cleanUp = () => ({
  type: constants.follow.CLEAN_UP,
});

export const followActions = {
  fetchFollowinUsers,
  setFollowingUsers,
  followUser,
  unfollowUser,
  cleanUp,
};
