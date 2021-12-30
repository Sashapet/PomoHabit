import React, { memo } from 'react';
import styled, { css } from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';

interface ITextProps {
  forgotPassword?: boolean;
  error?: boolean;
  backToLogin?: boolean;
  disabled?: boolean;
  goBack?: boolean;
  toastH1?: boolean;
  toastH2?: boolean;
  font?: string;
  size?: string;
  color?: string;
  decoration?: string;
  paddingTop?: string;
  paddingBottom?: string;
  marginTop?: string;
  marginBottom?: string;
  onPress?: (event: GestureResponderEvent) => void;
  inputColor?: boolean;
  paddingLeft?: string;
  paddingRight?: string;
}

const Text = styled.Text<ITextProps>`
  ${({ font }) => font && 'font-family:' + font};
  ${({ size }) => size && 'font-size:' + size};
  ${({ color }) => color && 'color:' + color};
  ${({ decoration }) => decoration && 'text-decoration:' + decoration};
  ${({ paddingLeft }) => paddingLeft && 'padding-left:' + paddingLeft};
  ${({ paddingRight }) => paddingRight && 'padding-right:' + paddingRight};
  ${({ paddingTop }) => paddingTop && 'padding-top:' + paddingTop};
  ${({ paddingBottom }) => paddingBottom && 'padding-bottom:' + paddingBottom};
  ${({ marginTop }) => marginTop && 'margin-top:' + marginTop};
  ${({ marginBottom }) => marginBottom && 'margin-bottom:' + marginBottom};
  ${({ goBack, theme }) => goBack && 'color:' + theme.SMALL_TEXT_COLOR};
  ${({ inputColor, theme }) => inputColor && 'color:' + theme.INPUT_COLOR};

  ${props =>
    props.toastH1 &&
    css`
      color: ${({ theme }) => theme.TEXT_COLOR};
      font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
      font-size: 17px;
    `}
  ${props =>
    props.toastH2 &&
    css`
      color: ${({ theme }) => theme.colors.white};
      font-family: ${({ theme }) => theme.fonts.NunitoSemiBold};
      font-size: 14px;
    `}
`;

export const TextStyle: React.FC<ITextProps> = memo(
  ({
    onPress,
    forgotPassword,
    error,
    goBack,
    children,
    backToLogin,
    disabled,
    toastH1,
    toastH2,
    font,
    size,
    color,
    decoration,
    paddingTop,
    paddingBottom,
    marginTop,
    marginBottom,
    paddingLeft,
    inputColor,
    paddingRight,
  }) => (
    <Text
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      toastH1={toastH1}
      toastH2={toastH2}
      onPress={onPress}
      disabled={disabled}
      forgotPassword={forgotPassword}
      backToLogin={backToLogin}
      error={error}
      goBack={goBack}
      font={font}
      size={size}
      color={color}
      inputColor={inputColor}
      decoration={decoration}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      {children}
    </Text>
  ),
);

TextStyle.displayName = 'TextStyle';
