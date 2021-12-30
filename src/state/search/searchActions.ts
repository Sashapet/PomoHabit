import { constants } from '../constants';
import { ContactProps } from './searchReducer';

const search = (payload: string) => ({
  type: constants.search.SEARCH,
  payload,
});
const clean = () => ({
  type: constants.search.CLEAN_UP,
});
// const updateLastSeen = (payload: { sort_name: string; key: string }) => ({
//   type: constants.search.UPDATE_LAST_SEEN,
//   payload,
// });
const loadMore = () => ({
  type: constants.search.LOAD_MORE,
});
const searchText = (payload: string) => ({
  type: constants.search.SEARCH_TEXT,
  payload,
});
const searchResults = (payload: Array<ContactProps>) => ({
  type: constants.search.SEARCH_RESULTS,
  payload,
});
// const updateSearchResults = (payload: Array<ContactProps>) => ({
//   type: constants.search.UPDATE_SEARCH_RESULTS,
//   payload,
// });

export const searchActions = {
  search,
  searchResults,
  clean,
  // updateLastSeen,
  loadMore,
  searchText,
  // updateSearchResults,
};
