import { RootState } from '../reducers';

const started = (state: RootState) => state.pomodoro.timerState.started;
const pomodoroModal = (state: RootState) => state.pomodoro.pomodoroModal;
const pomodorosMin = (state: RootState) =>
  state.pomodoro.pomodoroState.pomodoros;
const shortBreakMin = (state: RootState) =>
  state.pomodoro.pomodoroState.shortBreak;
const actionState = (state: RootState) => state.pomodoro.timerState.actionState;
const startButton = (state: RootState) => state.pomodoro.timerState.startButton;
const sessions = (state: RootState) => state.pomodoro.timerState.sessions;
const mainModal = (state: RootState) => state.pomodoro.mainModal;
const skip = (state: RootState) => state.pomodoro.timerState.skip;
const finish = (state: RootState) => state.pomodoro.timerState.finish;
const resetTimer = (state: RootState) => state.pomodoro.timerState.resetTimer;
const finishTime = (state: RootState) => state.pomodoro.timerState.finishTime;
const working = (state: RootState) => state.pomodoro.timerState.working;
const posted = (state: RootState) => state.pomodoro.timerState.posted;
const pomodoroTimer = (state: RootState) =>
  state.pomodoro.timerState.actionState.pomodoroTime;

export const pomodoroSelectors = {
  started,
  pomodorosMin,
  shortBreakMin,
  actionState,
  pomodoroTimer,
  startButton,
  sessions,
  mainModal,
  skip,
  finish,
  finishTime,
  resetTimer,
  working,
  pomodoroModal,
  posted,
};
