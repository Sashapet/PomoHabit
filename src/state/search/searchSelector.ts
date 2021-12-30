import { RootState } from '../reducers';

const contacts = (state: RootState) => state.search.contacts;

export const searchSelectors = { contacts };
