import React, { memo } from 'react';
import styled from 'styled-components/native';

import { SHADOWS } from '../../../assets/theme';

const LeftNumericButtonStyle = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.secondary};
  flex: 1;
  max-height: 60px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  align-items: center;
  justify-content: center;
`;
const RightNumericButtonStyle = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.secondary};
  flex: 1;
  max-height: 60px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold}; ;
`;

interface NumericButtonProps {
  disabled: boolean;
  onPress: () => void;
}

export const LeftNumericButton: React.FC<NumericButtonProps> = memo(
  ({ onPress, children, disabled }) => (
    <LeftNumericButtonStyle
      onPress={onPress}
      style={SHADOWS.ButtonShadow}
      disabled={disabled}
    >
      <ButtonText>{children}</ButtonText>
    </LeftNumericButtonStyle>
  ),
);

export const RightNumericButton: React.FC<NumericButtonProps> = memo(
  ({ onPress, children, disabled }) => (
    <RightNumericButtonStyle
      onPress={onPress}
      style={SHADOWS.ButtonShadow}
      disabled={disabled}
    >
      <ButtonText>{children}</ButtonText>
    </RightNumericButtonStyle>
  ),
);

LeftNumericButton.displayName = 'LeftNumericButton';
RightNumericButton.displayName = 'RightNumericButton';
