import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

const initialState: SearchReducerState = {
  contacts: null,
  // lastSeenUser: {
  //   sort_name: null,
  //   key: null,
  // },
  searchText: null,
};

export interface ContactProps {
  firstname: string;
  lastname: string;
  userId: string;
  avatar: string;
  sort_name: string;
}

export interface SearchReducerState {
  contacts: Array<ContactProps>;
  // lastSeenUser: {
  //   sort_name: string;
  //   key: string;
  // };
  searchText: string;
}

const SearchReducer = createReducer(initialState, {
  [constants.search.SEARCH_RESULTS]: (state, action) => {
    state.contacts = action.payload;
  },
  [constants.search.UPDATE_SEARCH_RESULTS]: (state, action) => {
    const newContacts = action.payload;
    const newArray = state.contacts.concat(newContacts);
    console.tron.log(newArray);
    state.contacts = newArray;
  },
  [constants.search.SEARCH_TEXT]: (state, action) => {
    state.searchText = action.payload;
  },
  // [constants.search.UPDATE_LAST_SEEN]: (state, action) => {
  //   state.lastSeenUser = action.payload;
  // },
  [constants.search.CLEAN_UP]: () => initialState,
});
export default SearchReducer;
