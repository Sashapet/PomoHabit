import { RootState } from '../reducers';

const following = (state: RootState) => state.follow.follow.following;
const followedBy = (state: RootState) => state.follow.follow.followedBy;

export const followSelectors = {
  following,
  followedBy,
};
