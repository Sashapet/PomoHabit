import database from '@react-native-firebase/database';

const search = async (searchText: string) =>
  database()
    .ref('/users')
    .orderByChild('sort_name')
    .startAt(searchText)
    .endAt(`${searchText}\uf8ff`)
    .limitToFirst(5)
    .once('value')
    .then(snapshot => snapshot.val());
// const loadMore = async (
//   searchText: string,
//   lastSeenName: string,
//   lastSeenKey: string,
// ) =>
//   database()
//     .ref('/users')
//     .orderByChild('sort_name')
//     .startAt(lastSeenName, lastSeenKey)
//     .endAt(`${searchText}\uf8ff`)
//     .limitToLast(4)
//     .once('value')
//     .then(snapshot => snapshot.val());

export const searchApi = {
  search,
  // loadMore,
};
