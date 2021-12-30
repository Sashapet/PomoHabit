import { AnyAction, CombinedState, combineReducers } from 'redux';

import searchReducer, { SearchReducerState } from './search/searchReducer';
import authReducer, { AuthReducerState } from './auth/authReducer';
import themeReducer, { ThemeReducerState } from './theme/themeReducer';
import messageReducer, {
  MessagesReducerState,
} from './messages/messagesReducer';
import pomodoroReducer, {
  PomodoroReducerState,
} from './pomodoro/pomodoroReducer';
import tasksReducer, { TasksReducerState } from './tasks/tasksReducer';
import followReducer, { FollowReducerState } from './follow/followReducer';
import postsReducer, { PostsReducerState } from './posts/postsReducer';

export interface RootState {
  auth: AuthReducerState;
  theme: ThemeReducerState;
  messages: MessagesReducerState;
  pomodoro: PomodoroReducerState;
  tasks: TasksReducerState;
  search: SearchReducerState;
  follow: FollowReducerState;
  posts: PostsReducerState;
}
const combinedReducer = combineReducers<CombinedState<RootState>>({
  auth: authReducer,
  theme: themeReducer,
  messages: messageReducer,
  pomodoro: pomodoroReducer,
  tasks: tasksReducer,
  search: searchReducer,
  follow: followReducer,
  posts: postsReducer,
});

export const rootReducer = (state: RootState | undefined, action: AnyAction) =>
  combinedReducer(state, action);
