import { RootState } from '../reducers';

const notification = (state: RootState) => state.messages.notification;

export const messageSelectors = {
  notification,
};
