import { createReducer } from '@reduxjs/toolkit';
import { DefaultTheme } from 'styled-components';

import { constants } from '../constants';
import { lightTheme } from '../../assets/theme/theme';

export const initialState: ThemeReducerState = {
  theme: { ...lightTheme },
  setOnSync: {
    loading: false,
    type: null,
  },
  splashLoaded: false,
  header: true,
};
export interface ThemeReducerState {
  theme: DefaultTheme;
  setOnSync: {
    loading: boolean;
    type: string;
  };
  splashLoaded: boolean;
  header: boolean;
}

const themeReducer = createReducer(initialState, {
  [constants.theme.SWITCH_THEME]: (state, action) => {
    state.theme = action.baseTheme;
  },
  [constants.theme.SET_ON_SYNC]: (state, action) => {
    state.setOnSync = action.payload;
  },
  [constants.theme.SPLASH_LOADED]: state => {
    state.splashLoaded = true;
  },
  [constants.theme.SHOW_HOME_HEADER]: (state, action) => {
    state.header = action.payload;
  },
});

export default themeReducer;
