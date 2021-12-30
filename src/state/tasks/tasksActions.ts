import { constants } from '../constants';
import { TaskProps } from './tasksReducer';

const showCreateModal = (payload: boolean) => ({
  type: constants.tasks.SHOW_CREATE_MODAL,
  payload,
});
const createTask = (payload: string) => ({
  type: constants.tasks.CREATE_TASK,
  payload,
});
const fetchPomodoroData = () => ({
  type: constants.tasks.CONNECT_TASKS_STATE,
});
const updateTasksState = (payload: Array<TaskProps>) => ({
  type: constants.tasks.UPDATE_TASKS_STATE,
  payload,
});
const updateTask = (payload: { title: string; taskId: string }) => ({
  type: constants.tasks.UPDATE_TASK,
  payload,
});
const deleteTask = (payload: string) => ({
  type: constants.tasks.DELETE_TASK,
  payload,
});
const cleanUp = () => ({
  type: constants.tasks.CLEAN_UP,
});
const selectTask = (payload: { taskId: string; title: string }) => ({
  type: constants.tasks.SELECT_TASK,
  payload,
});

const showUpdateModal = (payload: {
  show: boolean;
  task: string;
  taskId: string;
}) => ({
  type: constants.tasks.SHOW_UPDATE_MODAL,
  payload,
});

export const tasksActions = {
  showCreateModal,
  createTask,
  fetchPomodoroData,
  updateTasksState,
  updateTask,
  showUpdateModal,
  deleteTask,
  selectTask,
  cleanUp,
};
