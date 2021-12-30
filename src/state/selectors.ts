import { authSelectors } from './auth/authSelector';
import { themeSelectors } from './theme/themeSelector';
import { messageSelectors } from './messages/messagesSelector';
import { pomodoroSelectors } from './pomodoro/pomodoroSelector';
import { tasksSelectors } from './tasks/tasksSelector';
import { searchSelectors } from './search/searchSelector';
import { followSelectors } from './follow/followSelector';
import { postsSelectors } from './posts/postsSelector';

export const selectors = {
  auth: authSelectors,
  theme: themeSelectors,
  messages: messageSelectors,
  pomodoro: pomodoroSelectors,
  tasks: tasksSelectors,
  search: searchSelectors,
  follow: followSelectors,
  posts: postsSelectors,
} as const;
