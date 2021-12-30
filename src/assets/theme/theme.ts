import { DefaultTheme } from 'styled-components/native';

import { COLORS, FONTS, SHADOWS } from '.';

export const darkTheme: DefaultTheme = {
  fonts: FONTS,
  colors: COLORS,
  shadows: SHADOWS,
  mode: 'dark',
  PRIMARY_BACKGROUND_COLOR: ['#141e30', '#243b55'],
  PRIMARY_HOMEVIEW_COLOR: '#004987',
  TEXT_COLOR: '#fff',
  // SECONDARY_TEXT_COLOR: '#000',
  SECONDARY_TEXT_COLOR: 'rgba(0, 0, 0, 0.5)',
  PRIMARY_BUTTON_COLOR: '#004987',
  INPUT_COLOR: '#fff',
  TOGGLE_TEXT_COLOR: '#fff',
  SMALL_TEXT_COLOR: 'rgba(255, 255, 255, 0.8)',
};
export const lightTheme: DefaultTheme = {
  fonts: FONTS,
  colors: COLORS,
  shadows: SHADOWS,
  mode: 'light',
  PRIMARY_BACKGROUND_COLOR: ['#2962ca', '#298fca'], //Linear Gradient
  PRIMARY_HOMEVIEW_COLOR: '#fff',
  TEXT_COLOR: '#fff',
  SECONDARY_TEXT_COLOR: '#000',
  // SECONDARY_TEXT_COLOR: 'rgba(0, 0, 0, 0.5)', //placeholder
  PRIMARY_BUTTON_COLOR: '#e5534b',
  INPUT_COLOR: '#000',
  TOGGLE_TEXT_COLOR: '#000',
  SMALL_TEXT_COLOR: 'rgba(0,0,0,0.6)',
};
