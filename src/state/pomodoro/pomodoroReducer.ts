import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

const initialState: PomodoroReducerState = {
  mainModal: {
    state: false,
    type: null,
  },
  pomodoroModal: false,
  pomodoroState: {
    pomodoros: null,
    shortBreak: null,
  },
  timerState: {
    started: false,
    sessions: 0,
    actionState: {
      pomodoroTime: true,
    },
    skip: false,
    finish: false,
    resetTimer: null,
    posted: false,
    working: false,
    finishTime: {
      min: null,
      sec: null,
    },
    startButton: true,
  },
};

export interface PomodoroReducerState {
  mainModal: {
    state: boolean;
    type: string;
  };
  pomodoroModal: boolean;
  pomodoroState: {
    pomodoros: number | null;
    shortBreak: number | null;
  };
  timerState: {
    started: boolean;
    sessions: number;
    actionState: {
      pomodoroTime: boolean;
    };
    skip: boolean;
    finish: boolean;
    resetTimer: boolean;
    posted: boolean;
    working: boolean;
    startButton: boolean;
    finishTime: {
      min: number;
      sec: number;
    };
  };
}

const PomodoroReducer = createReducer(initialState, {
  [constants.pomodoro.UPDATE_POMODORO_STATE]: (state, action) => {
    state.pomodoroState = action.payload;
  },
  [constants.pomodoro.TIMER_START]: state => {
    state.timerState.started = true;
  },
  [constants.pomodoro.TIMER_STOP]: state => {
    state.timerState.started = false;
  },
  [constants.pomodoro.SHORT_BREAK]: state => {
    state.timerState.actionState.pomodoroTime = false;
  },
  [constants.pomodoro.TIMER_START]: state => {
    state.timerState.started = true;
  },
  [constants.pomodoro.SHOW_POMODORO_MODAL]: (state, action) => {
    state.pomodoroModal = action.payload;
  },
  [constants.pomodoro.SET_WORKING]: (state, action) => {
    state.timerState.working = action.payload;
  },
  [constants.pomodoro.POMODORO_START]: state => {
    state.timerState.actionState.pomodoroTime = true;
  },
  [constants.pomodoro.CHANGE_BUTTON]: (state, action) => {
    state.timerState.startButton = action.payload;
  },
  [constants.pomodoro.ADD_SESSION]: state => {
    state.timerState.sessions += 1;
  },
  [constants.pomodoro.SHOW_MODAL]: (state, action) => {
    state.mainModal = action.payload;
  },
  [constants.pomodoro.SKIP]: (state, action) => {
    state.timerState.skip = action.payload;
  },
  [constants.pomodoro.FINISH]: (state, action) => {
    state.timerState.finish = action.payload;
  },
  [constants.pomodoro.SET_FINISH_TIME]: (state, action) => {
    state.timerState.finishTime = action.payload;
  },
  [constants.pomodoro.CLEAN_SESSIONS]: state => {
    state.timerState.sessions = 0;
  },
  [constants.pomodoro.RESET_TIMER]: (state, action) => {
    state.timerState.resetTimer = action.payload;
  },
  [constants.pomodoro.CLEAN_UP]: () => initialState,
});
export default PomodoroReducer;
