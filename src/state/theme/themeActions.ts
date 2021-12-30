import { DefaultTheme } from 'styled-components/native';

import { constants } from '../constants';

const switchTheme = (baseTheme: DefaultTheme) => ({
  type: constants.theme.SWITCH_THEME,
  baseTheme,
});
const setOnSync = (payload: { loading: boolean; type: string }) => ({
  type: constants.theme.SET_ON_SYNC,
  payload,
});
const splashLoaded = () => ({
  type: constants.theme.SPLASH_LOADED,
});
const showOuterTabBar = (payload: boolean) => ({
  type: constants.theme.SHOW_OUTER_TAB_BAR,
  payload,
});
const showHomeHeader = (payload: boolean) => ({
  type: constants.theme.SHOW_HOME_HEADER,
  payload,
});

export const themeActions = {
  switchTheme,
  setOnSync,
  splashLoaded,
  showOuterTabBar,
  showHomeHeader,
};
