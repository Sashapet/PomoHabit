import { constants } from '../constants';
import { PomodoroReducerState } from './pomodoroReducer';
import { PostProps } from '../../types/PomodoroTypes';

const fetchPomodoroData = () => ({
  type: constants.pomodoro.CONNECT_POMODORO_STATE,
});
const updatePomodoroState = (payload: PomodoroReducerState) => ({
  type: constants.pomodoro.UPDATE_POMODORO_STATE,
  payload,
});
const timerStart = () => ({
  type: constants.pomodoro.TIMER_START,
});
const timerStop = () => ({
  type: constants.pomodoro.TIMER_STOP,
});
const shortBreak = () => ({
  type: constants.pomodoro.SHORT_BREAK,
});
const pomodoroStart = () => ({
  type: constants.pomodoro.POMODORO_START,
});
const changeButton = (payload: boolean) => ({
  type: constants.pomodoro.CHANGE_BUTTON,
  payload,
});
const addSession = () => ({
  type: constants.pomodoro.ADD_SESSION,
});
const showPomodoroModal = (payload: boolean) => ({
  type: constants.pomodoro.SHOW_POMODORO_MODAL,
  payload,
});
const showModal = (payload: { state: boolean; type: string }) => ({
  type: constants.pomodoro.SHOW_MODAL,
  payload,
});
const skip = (payload: boolean) => ({
  type: constants.pomodoro.SKIP,
  payload,
});
const finish = (payload: boolean) => ({
  type: constants.pomodoro.FINISH,
  payload,
});
const setFinishTime = (payload: { min: number; sec: number }) => ({
  type: constants.pomodoro.SET_FINISH_TIME,
  payload,
});
const editPomodoro = (payload: { pomodoros: number; shortBreak: number }) => ({
  type: constants.pomodoro.EDIT_POMODORO,
  payload,
});
const post = (payload: PostProps) => ({
  type: constants.pomodoro.POST,
  payload,
});
const resetTimer = (payload: boolean) => ({
  type: constants.pomodoro.RESET_TIMER,
  payload,
});
const setPosted = (payload: boolean) => ({
  type: constants.pomodoro.SET_POSTED,
  payload,
});
const setWorking = (payload: boolean) => ({
  type: constants.pomodoro.SET_WORKING,
  payload,
});
const cleanSessions = () => ({
  type: constants.pomodoro.CLEAN_SESSIONS,
});
const cleanUp = () => ({
  type: constants.pomodoro.CLEAN_UP,
});

export const pomodoroActions = {
  fetchPomodoroData,
  updatePomodoroState,
  timerStart,
  timerStop,
  shortBreak,
  pomodoroStart,
  changeButton,
  addSession,
  showModal,
  skip,
  showPomodoroModal,
  editPomodoro,
  setFinishTime,
  finish,
  post,
  setPosted,
  resetTimer,
  setWorking,
  cleanUp,
  cleanSessions,
};
