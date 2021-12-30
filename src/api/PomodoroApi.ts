import database from '@react-native-firebase/database';

import { PostProps } from '../types/PomodoroTypes';

const addPost = async (
  data: PostProps,
  userId: string,
  followedBy: Array<{ userId: string }>,
) => {
  const { style, sessions, time, title, description } = data;

  const timestamp = database.ServerValue.TIMESTAMP;
  const postsRef = await database().ref('/posts/').push();

  //COPY ARRAY AND ADD CURRENT USER
  const newFollowByArray = [...followedBy, { userId }];

  return (
    postsRef
      .set({
        style,
        sessions,
        time,
        title,
        description,
        userId,
        createdAt: timestamp,
        postId: postsRef.key,
      })
      //ADDING POST TO ALL OF USERS FEED NODE THAT ARE FOLLOWING YOU
      .then(() => {
        const uid = userId;
        newFollowByArray.forEach(user => {
          const postsIdsRef = database()
            .ref('/feed/' + user.userId)
            .push();
          postsIdsRef.set({
            createdAt: timestamp,
            postId: postsRef.key,
            userId: uid,
            postKey: postsIdsRef.key,
          });
        });
      })
  );
};

const editPomodoro = (
  data: { pomodoros: number; shortBreak: number },
  oldData: { oldPomodoros: number; oldShortBreak: number },
  userId: string,
) => {
  const { pomodoros, shortBreak } = data;
  const { oldPomodoros, oldShortBreak } = oldData;

  const pomodoroRef = database().ref('/pomodoroSettings/' + userId);
  if (pomodoros !== oldPomodoros && shortBreak === oldShortBreak) {
    return pomodoroRef.update({
      pomodoros,
    });
  } else if (pomodoros === oldPomodoros && shortBreak !== oldShortBreak) {
    return pomodoroRef.update({
      shortBreak,
    });
  } else if (pomodoros !== oldPomodoros && shortBreak !== oldShortBreak) {
    return pomodoroRef.update({
      pomodoros,
      shortBreak,
    });
  }
};

export const pomodoroApi = {
  addPost,
  editPomodoro,
};
