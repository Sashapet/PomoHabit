import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

const initialState: MessagesReducerState = {
  notification: {
    type: null,
    message: null,
  },
};
export interface MessagesReducerState {
  notification: {
    type: string;
    message: string;
  };
}

const MessageReducer = createReducer(initialState, {
  [constants.messages.SUCCESS]: (state, action) => {
    state.notification = action.payload;
  },
  [constants.messages.ERROR]: (state, action) => {
    state.notification = action.payload;
  },
  [constants.messages.CLEAN_MESSAGES]: () => initialState,
});

export default MessageReducer;
