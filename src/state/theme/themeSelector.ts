import { RootState } from '../reducers';

const theme = (state: RootState) => state.theme.theme;
const themeState = (state: RootState) => state.theme;
const setOnSync = (state: RootState) => state.theme.setOnSync;
const splashLoaded = (state: RootState) => state.theme.splashLoaded;
export const themeSelectors = {
  theme,
  themeState,
  setOnSync,
  splashLoaded,
};
