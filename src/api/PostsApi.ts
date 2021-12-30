import database from '@react-native-firebase/database';
import firebaseApp from '@react-native-firebase/app';

import { PostProps } from '../types/postTypes';
import { UserProps } from '../types/authTypes';

const fetchPostsIds = async (userId: string) =>
  firebaseApp
    .database()
    .ref(`feed`)
    .child(userId)
    .orderByKey()
    .limitToLast(4)
    .once('value')
    .then(snapshot => {
      //ATTACHING POST INFO
      const data = snapshot.val();
      const postIdsArray = [];
      let formatedArray = [];

      for (const key in data) {
        postIdsArray.push(data[key]);
      }
      //REMOVE LAST ELEMENT FOR PAGINATION
      if (postIdsArray.length > 3) {
        formatedArray = postIdsArray.slice(0, -1);
      } else {
        formatedArray = [...postIdsArray];
      }
      //MAKING SURE THAT EVERYTHING BEEN SORTED
      formatedArray.sort((x, y) => y.createdAt - x.createdAt);
      //GETTING KEY SPAN
      const firstKey = formatedArray[0]?.postKey;
      const lastKey = formatedArray[formatedArray.length - 1]?.postKey;

      return { formatedArray, lastKey, firstKey };
    });

const loadnewPostsIds = async (userId: string, lastSeenKey: string) =>
  firebaseApp
    .database()
    .ref(`feed`)
    .child(userId)
    .orderByKey()
    .endAt(lastSeenKey)
    .limitToLast(4)
    .once('value')
    .then(snapshot => {
      //ATTACHING POST INFO
      const data = snapshot.val();
      const postIdsArray = [];

      for (const key in data) {
        //SKIP OLD  KEY
        if (key !== lastSeenKey) {
          postIdsArray.push(data[key]);
        }
      }

      //MAKING SURE THAT EVERYTHING BEEN SORTED
      postIdsArray.sort((x, y) => y.createdAt - x.createdAt);

      let formatedArray = [];
      //REMOVE LAST ELEMENT FOR PAGINATION
      if (postIdsArray.length > 3) {
        formatedArray = postIdsArray.slice(0, -1);
      } else {
        formatedArray = [...postIdsArray];
      }
      //GETTING LAST KEY
      const lastKey = postIdsArray[postIdsArray.length - 1]?.postKey;

      return { formatedArray, lastKey };
    });
const fetchPosts = async (
  postIds: Array<{ createdAt: Date; postId: string; postKey: string }>,
) => {
  const newArray = [] as Array<PostProps>;
  const myPromise = new Promise(resolve => {
    postIds.forEach((post, index) => {
      const postRef = database().ref(`posts/${post.postId}`);
      postRef.once('value').then(snapshot => {
        const postData = snapshot.val();
        newArray.push(postData);
        if (index === postIds.length - 1) {
          resolve(newArray);
        }
      });
    });
  });
  return myPromise.then(result => result);
};

const fetchUser = async (userId: string, users: Array<UserProps>) => {
  const findUser = users?.find(user => user.userId === userId);
  if (!findUser) {
    const userRef = database().ref('/users/' + userId);
    return userRef.once('value').then(snapshot => snapshot.val());
  } else {
    return false;
  }
};

const refreshPostsIds = async (userId: string, firstPostKey: string) =>
  firebaseApp
    .database()
    .ref(`feed`)
    .child(userId)
    .orderByKey()
    .startAt(firstPostKey)
    .once('value')
    .then(snapshot => {
      //ATTACHING POST INFO
      const data = snapshot.val();
      const postIdsArray = [];
      let firstKey = firstPostKey;
      let sortedArray = [] as Array<{
        createdAt: Date;
        postId: string;
        postKey: string;
      }>;
      for (const key in data) {
        if (key === firstPostKey) {
          if (postIdsArray.length > 0) {
            sortedArray = postIdsArray.sort(
              (x, y) => y.createdAt - x.createdAt,
            );
            firstKey = sortedArray[0].postKey;
          }
          return {
            sortedArray,
            firstKey,
          };
        }
        postIdsArray.push(data[key]);
      }
    });

export const postsApi = {
  fetchPostsIds,
  fetchPosts,
  fetchUser,
  loadnewPostsIds,
  refreshPostsIds,
};
