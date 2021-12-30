import { constants } from '../constants';

const success = (payload: { type: string; message: string }) => ({
  type: constants.messages.SUCCESS,
  payload,
});

const error = (payload: { type: string; message: string }) => ({
  type: constants.messages.ERROR,
  payload,
});
const cleanUp = () => ({
  type: constants.messages.CLEAN_MESSAGES,
});

export const messagesActions = {
  success,
  error,
  cleanUp,
};
