import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    fonts: FONTS;
    colors: COLORS;
    shadows: SHADOWS;
    mode: string;
    PRIMARY_BACKGROUND_COLOR: Array<string>; //Linear Gradient
    PRIMARY_HOMEVIEW_COLOR: string;
    TEXT_COLOR: string;
    SECONDARY_TEXT_COLOR: string; //placeholder
    PRIMARY_BUTTON_COLOR: string;
    INPUT_COLOR: string;
    TOGGLE_TEXT_COLOR: string;
    SMALL_TEXT_COLOR: string;
  }
}
interface COLORS {
  primary: string;
  lightGray: string;
  secondary: string;
  lightBlue: string;
  opacity01: string;
  opacity02: string;
  opacity03: string;
  opacity04: string;
  opacity06: string;
  opacity07: string;
  black: string;
  white: string;
  lightGreen: string;
  checkGreen: string;
  checkRed: string;
  borderBottomLight: string;
  sunnyYellow: string;
  placeholderColor: string;
  greyish: string;
  lightBlue: string;
  darkScreen: string;
  darkHeaderString: string;
  red: string;
  paleWhite: string;
}
interface FONTS {
  MontserratBold: string;
  MontserratLight: string;
  MontserratRegular: string;
  NunitoBlack: string;
  NunitoBold: string;
  NunitoExtraBold: string;
  NunitoExtraLight: string;
  NunitoLight: string;
  NunitoRegular: string;
  NunitoSemiBold: string;
}
interface SHADOWS {
  ButtonShadow: ButtonShadowProps;
}
interface ButtonShadowProps {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}
