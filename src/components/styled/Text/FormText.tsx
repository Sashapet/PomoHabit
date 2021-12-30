import styled from 'styled-components/native';
import React, { memo } from 'react';
import { GestureResponderEvent } from 'react-native';

export const FormHeader = styled.Text`
  font-size: 35px;
  font-family: ${({ theme }) => theme.fonts.NunitoBold};
  color: ${({ theme }) => theme.colors.white};
`;

const UnderlinedTextStyle = styled.Text<{ disabled: boolean }>`
  font-size: 15px;
  text-decoration: underline;
  padding-vertical: 10px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.NunitoBold};
`;

const GoBackTextStyle = styled.Text<{ disabled: boolean }>`
  padding-bottom: 30px;
  font-size: 13px;
  color: ${({ theme }) => theme.SMALL_TEXT_COLOR};
`;

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  disabled: boolean;
}

export const UnderlinedText: React.FC<ButtonProps> = memo(
  ({ onPress, children, disabled }) => (
    <UnderlinedTextStyle disabled={disabled} onPress={onPress}>
      {children}
    </UnderlinedTextStyle>
  ),
);

export const GoBackText: React.FC<ButtonProps> = memo(
  ({ onPress, children, disabled }) => (
    <GoBackTextStyle disabled={disabled} onPress={onPress}>
      {children}
    </GoBackTextStyle>
  ),
);
GoBackText.displayName = 'GoBackText';
UnderlinedText.displayName = 'UnderlinedText';
