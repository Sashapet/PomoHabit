import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const login = async (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password);
const logout = async () => auth().signOut();
const singup = async (email: string, password: string) =>
  auth().createUserWithEmailAndPassword(email, password);
const recover = async (email: string) => auth().sendPasswordResetEmail(email);
const addUser = async (
  firstname: string,
  lastname: string,
  userId: string,
  avatar: string,
) => {
  const name = firstname + ' ' + lastname;
  const sort_name = name.toLowerCase() + '_' + userId.toLowerCase();

  const usersRef = await database().ref('/users');
  return usersRef
    .child(userId)
    .set({ firstname, lastname, sort_name, userId, avatar });
};
const addPomodoroInfo = async (
  shortBreak: number,
  pomodoros: number,
  userId: string,
) => {
  const usersRef = await database().ref('/pomodoroSettings');
  return usersRef.child(userId).set({ shortBreak, pomodoros, userId });
};
const createTask = async (title: string, userId: string) => {
  const tasksRef = await database()
    .ref('/tasks/' + userId)
    .push();
  return tasksRef.set({
    taskId: tasksRef.key,
    timestamp: Date.now(),
    title,
  });
};
const updateTask = async (title: string, userId: string, taskId: string) => {
  const tasksRef = await database().ref('/tasks/' + userId + '/' + taskId);
  return tasksRef.update({
    title,
  });
};
const deleteTask = async (taskId: string, userId: string) => {
  const tasksRef = await database().ref('/tasks/' + userId + '/' + taskId);
  return tasksRef.remove();
};

export const Api = {
  login,
  logout,
  singup,
  recover,
  addUser,
  addPomodoroInfo,
  createTask,
  deleteTask,
  updateTask,
};
