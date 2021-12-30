import { call, put, takeLatest } from 'redux-saga/effects';

import { actions } from '../actions';
import { constants } from '../constants';
import { searchApi } from '../../api/SearchApi';
import { ContactProps } from './searchReducer';

type KeyedContact = {
  [key: string]: ContactProps;
};

function* search(data: { type: string; payload: string }) {
  const { payload } = data;
  const searchText = payload;
  try {
    yield put(actions.theme.setOnSync({ loading: true, type: 'search' }));
    const contacts: KeyedContact = yield call(
      searchApi.search,
      searchText.toLowerCase(),
    );
    yield put(actions.search.searchText(searchText));

    const contactArray = [];

    for (const i in contacts) {
      contactArray.push(contacts[i]);
    }
    // if (contactArray.length === 4) {
    //   // ADD LAST SEEN USER
    //   yield put(
    //     actions.search.updateLastSeen({
    //       sort_name: contactArray[contactArray.length - 1].sort_name,
    //       key: contactArray[contactArray.length - 1].userId,
    //     }),
    //   );
    //   yield put(actions.search.searchResults(contactArray.slice(0, -1)));
    // } else {
    yield put(actions.search.searchResults(contactArray));
    // }
  } catch (e) {
    console.tron.log(e.message);
    yield put(actions.messages.error({ type: 'error', message: e.message }));
  } finally {
    yield put(actions.theme.setOnSync({ loading: false, type: 'search' }));
  }
}

// function* loadMore() {
//   try {
//     yield put(actions.theme.setOnSync({ loading: true, type: 'loadMore' }));
//     const searchText: string = yield select(state => state.search.searchText);
//     const lastSeenUser: { sort_name: string; key: string } = yield select(
//       state => state.search.lastSeenUser,
//     );
//     const contacts: KeyedContact = yield call(
//       searchApi.loadMore,
//       searchText.toLowerCase(),
//       lastSeenUser.sort_name.toLowerCase(),
//       lastSeenUser.key,
//     );

//     const contactArray = [];

//     for (const i in contacts) {
//       contactArray.push(contacts[i]);
//     }
//     console.tron.log(contactArray);

// if (contactArray.length > 3) {
// ADD LAST SEEN USER ID
// yield put(
//   actions.search.updateLastSeen(
//     contactArray[contactArray.length - 1].sort_name,
//   ),
// );
// console.tron.log(contactArray);
// yield put(actions.search.updateSearchResults(contactArray.slice(0, -1)));
// } else {
// yield put(actions.search.updateSearchResults(contactArray));
// }
//ADD LAST SEEN USER ID
// yield put(actions.search.updateSearchResults(contactArray));
//   } catch (e) {
//     console.tron.log(e.message);
//     yield put(actions.theme.handleError(e.code));
//     yield put(actions.messages.error({ type: 'error', message: e.message }));
//   } finally {
//     yield put(actions.theme.setOnSync({ loading: false, type: 'loadMore' }));
//   }
// }

export default function* searchSaga() {
  yield takeLatest(constants.search.SEARCH, search);
  // yield takeLatest(constants.search.LOAD_MORE, loadMore);
}
