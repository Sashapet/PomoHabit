import { authActions } from './auth/authActions';
import { themeActions } from './theme/themeActions';
import { messagesActions } from './messages/messagesActions';
import { pomodoroActions } from './pomodoro/pomodoroActions';
import { tasksActions } from './tasks/tasksActions';
import { searchActions } from './search/searchActions';
import { followActions } from './follow/followActions';
import { postsActions } from './posts/postsActions';

export const actions = {
  auth: authActions,
  theme: themeActions,
  messages: messagesActions,
  pomodoro: pomodoroActions,
  tasks: tasksActions,
  search: searchActions,
  follow: followActions,
  posts: postsActions,
};

export const authAction = {
  login: authActions.signIn,
  register: authActions.signUp,
  recover: authActions.recoverUser,
};
