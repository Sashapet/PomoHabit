import React, { memo } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

import { COLORS, SHADOWS } from '../../../assets/theme';

const FullButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.secondary};
  flex: 1;
  max-height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;
const OnlyBorderButton = styled.TouchableOpacity`
  border: 3px solid ${({ theme }) => theme.colors.secondary};
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

interface RoundedButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export const RoundedButton: React.FC<RoundedButtonProps> = memo(
  ({ onPress, children, loading, disabled }) => (
    <FullButton
      onPress={onPress}
      style={SHADOWS.ButtonShadow}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.opacity04} />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </FullButton>
  ),
);

export const BorderButton: React.FC<RoundedButtonProps> = memo(
  ({ onPress, children, disabled }) => (
    <OnlyBorderButton onPress={onPress} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </OnlyBorderButton>
  ),
);
BorderButton.displayName = 'BorderButton';
RoundedButton.displayName = 'RoundedButton';
