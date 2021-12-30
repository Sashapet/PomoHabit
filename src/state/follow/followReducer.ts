import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

const initialState: FollowReducerState = {
  follow: {
    following: [],
    followedBy: [],
  },
};

export interface FollowReducerState {
  follow: {
    following: Array<{ userId: string }>;
    followedBy: Array<{ userId: string }>;
  };
}

const FollowReducer = createReducer(initialState, {
  [constants.follow.SET_FOLLOWING_USERS]: (state, action) => {
    state.follow = action.payload;
  },
  [constants.follow.CLEAN_UP]: () => initialState,
});
export default FollowReducer;
