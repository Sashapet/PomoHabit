import { RootState } from '../reducers';

const posts = (state: RootState) => state.posts.posts;
const canBeUpdated = (state: RootState) => state.posts.canBeUpdated;
const likedPosts = (state: RootState) => state.posts.likedPosts;
export const postsSelectors = {
  posts,
  canBeUpdated,
  likedPosts,
};
