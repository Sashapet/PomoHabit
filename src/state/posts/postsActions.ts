import { constants } from '../constants';
import { PostProps } from '../../types/postTypes';
import { UserProps } from '../../types/authTypes';

const fetchPosts = () => ({
  type: constants.posts.FETCH_POSTS,
});
const setPosts = (payload: Array<PostProps>) => ({
  type: constants.posts.SET_POSTS,
  payload,
});
const setUsers = (payload: Array<UserProps>) => ({
  type: constants.posts.SET_USER,
  payload,
});
const setLikedPosts = (payload: string) => ({
  type: constants.posts.SET_LIKED_POSTS,
  payload,
});
const setLastSeenKey = (payload: string) => ({
  type: constants.posts.LAST_SEEN_KEY,
  payload,
});

const setFirstSeenKey = (payload: string) => ({
  type: constants.posts.FIRST_SEEN_KEY,
  payload,
});
const checkIfLiked = (payload: string) => ({
  type: constants.posts.CHECH_IF_LIKED,
  payload,
});
const cleanPosts = () => ({
  type: constants.posts.CLEAN_UP,
});
const loadNewPosts = () => ({
  type: constants.posts.LOAD_NEW_POSTS,
});
const like = (payload: string) => ({
  type: constants.posts.LIKE,
  payload,
});
const canBeUpdated = (payload: boolean) => ({
  type: constants.posts.CAN_BE_UPDATED,
  payload,
});
const refresh = () => ({
  type: constants.posts.REFRESH,
});
export const postsActions = {
  fetchPosts,
  setPosts,
  setUsers,
  cleanPosts,
  setLastSeenKey,
  loadNewPosts,
  setLikedPosts,
  checkIfLiked,
  canBeUpdated,
  refresh,
  setFirstSeenKey,
  like,
};
