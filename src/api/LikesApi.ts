import database from '@react-native-firebase/database';

const like = async (userId: string, postId: string) => {
  const likesRef = await database().ref('/likes/' + postId);
  return likesRef.push({
    userId,
  });
};

const checkIfLiked = async (userId: string, postId: string) => {
  const likesRef = await database().ref('/likes/' + postId);
  return likesRef
    .orderByChild('userId')
    .equalTo(userId)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        return true;
      } else {
        return false;
      }
    });
};

const addCount = async (postId: string) => {
  const likesRef = await database().ref('/likes/' + postId + '/counter');
  likesRef.transaction((value: { counter: number }) => {
    if (value === null) {
      // the counter doesn't exist yet, start at one
      return { counter: 1 };
    } else if (typeof value.counter === 'number') {
      // increment - the normal case
      return { counter: value.counter + 1 };
    } else {
      console.log('Not a number');
    }
  });
};

const likeCount = async (postId: string) => {
  const likesRef = await database().ref(
    '/likes/' + postId + '/counter/counter',
  );
  return likesRef.once('value').then(snap => {
    if (snap.exists()) {
      return snap.val();
    } else {
      return 0;
    }
  });
};

export const likesApi = {
  checkIfLiked,
  like,
  addCount,
  likeCount,
};
