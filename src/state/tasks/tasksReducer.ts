import { createReducer } from '@reduxjs/toolkit';

import { constants } from '../constants';

const initialState: TasksReducerState = {
  tasks: null,
  selectedTask: {
    taskId: null,
    title: null,
  },
  showCreateModal: false,
  showUpdateModal: {
    show: false,
    task: null,
    taskId: null,
  },
};

export interface TaskProps {
  title: string;
  taskId: string;
  timestamp: Date;
}

interface showUpdateModalProps {
  show: boolean;
  task: string;
  taskId: string;
}

export interface TasksReducerState {
  tasks: Array<TaskProps>;
  showCreateModal: boolean;
  showUpdateModal: showUpdateModalProps;
  selectedTask: {
    taskId: string;
    title: string;
  };
}

const TasksReducer = createReducer(initialState, {
  [constants.tasks.SHOW_CREATE_MODAL]: (state, action) => {
    state.showCreateModal = action.payload;
  },
  [constants.tasks.SHOW_UPDATE_MODAL]: (state, action) => {
    state.showUpdateModal = action.payload;
  },
  [constants.tasks.SELECT_TASK]: (state, action) => {
    state.selectedTask = action.payload;
  },
  [constants.tasks.UPDATE_TASKS_STATE]: (state, action) => {
    state.tasks = action.payload;
  },
  [constants.tasks.CLEAN_UP]: () => initialState,
});
export default TasksReducer;
