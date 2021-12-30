import database from '@react-native-firebase/database';

const follow = async (myUserId: string, friendUserId: string) => {
  console.tron.log('Follow', myUserId, friendUserId);

  const followingRef = await database().ref(
    '/follow/' + myUserId + '/following/' + friendUserId,
  );
  const followedByRef = await database().ref(
    '/follow/' + friendUserId + '/followedBy/' + myUserId,
  );
  return followedByRef
    .set({ userId: myUserId })
    .then(() => followingRef.set({ userId: friendUserId }));
};
const unFollow = async (myUserId: string, friendUserId: string) => {
  console.tron.log('Unfollow : ' + myUserId, friendUserId);
  const followingRef = await database().ref(
    '/follow/' + myUserId + '/following/' + friendUserId,
  );
  const followedByRef = await database().ref(
    '/follow/' + friendUserId + '/followedBy/' + myUserId,
  );
  return followingRef.remove().then(() => followedByRef.remove());
};

const filterFeed = async (myUserId: string, friendUserId: string) => {
  const postsRef = await database().ref('/feed/' + myUserId);
  const query = await postsRef.orderByChild('userId').equalTo(friendUserId);
  return query.once('value').then(snapshot => {
    if (snapshot.exists) {
      const posts = snapshot.val();
      for (const key in posts) {
        postsRef.child(key).remove();
      }
    }
  });
};

export const FollowApi = {
  follow,
  unFollow,
  filterFeed,
};
