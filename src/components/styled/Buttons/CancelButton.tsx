import React, { memo } from 'react';
import styled from 'styled-components/native';

import { SHADOWS } from '../../../assets/theme';

const CancelButtonStyle = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.greyish};
  flex: 1;
  max-height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold}; ;
`;

interface CancelButtonProps {
  disabled: boolean;
  onPress: () => void;
}

export const CancelButton: React.FC<CancelButtonProps> = memo(
  ({ onPress, children, disabled }) => (
    <CancelButtonStyle
      onPress={onPress}
      style={SHADOWS.ButtonShadow}
      disabled={disabled}
    >
      <ButtonText>{children}</ButtonText>
    </CancelButtonStyle>
  ),
);

CancelButton.displayName = 'CancelButton';
