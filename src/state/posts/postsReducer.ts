import { createReducer } from '@reduxjs/toolkit';

import { PostProps } from '../../types/postTypes';
import { constants } from '../constants';
import { UserProps } from '../../types/authTypes';

const initialState: PostsReducerState = {
  posts: [],
  users: [],
  likedPosts: [],
  lastSeenKey: null,
  firstSeenKey: null,
  canBeUpdated: true,
};

export interface PostsReducerState {
  posts: Array<PostProps>;
  users: Array<UserProps>;
  likedPosts: Array<string>;
  lastSeenKey: string;
  firstSeenKey: string;
  canBeUpdated: boolean;
}

const PostsReducer = createReducer(initialState, {
  [constants.posts.SET_POSTS]: (state, action) => {
    state.posts = action.payload;
  },
  [constants.posts.CAN_BE_UPDATED]: (state, action) => {
    state.canBeUpdated = action.payload;
  },
  [constants.posts.SET_LIKED_POSTS]: (state, action) => {
    state.likedPosts = [...state.likedPosts, action.payload];
  },
  [constants.posts.SET_USER]: (state, action) => {
    state.users = action.payload;
  },
  [constants.posts.LAST_SEEN_KEY]: (state, action) => {
    state.lastSeenKey = action.payload;
  },
  [constants.posts.FIRST_SEEN_KEY]: (state, action) => {
    state.firstSeenKey = action.payload;
  },

  [constants.posts.CLEAN_UP]: () => initialState,
});
export default PostsReducer;
