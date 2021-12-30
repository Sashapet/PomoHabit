import { RootState } from '../reducers';

const showCreateModal = (state: RootState) => state.tasks.showCreateModal;

const tasks = (state: RootState) => state.tasks.tasks;

const showUpdateModal = (state: RootState) => state.tasks.showUpdateModal;
const selectedTaskId = (state: RootState) => state.tasks.selectedTask.taskId;
const selectedTaskTitle = (state: RootState) => state.tasks.selectedTask.title;
export const tasksSelectors = {
  showCreateModal,
  showUpdateModal,
  tasks,
  selectedTaskId,
  selectedTaskTitle,
};
