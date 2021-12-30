import React, { memo } from 'react';
import styled from 'styled-components/native';

const SecondaryBorderButtonStyle = styled.TouchableOpacity`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  flex: 1;
  max-height: 60px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold}; ;
`;

interface BorderButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export const SecondaryBorderButton: React.FC<BorderButtonProps> = memo(
  ({ onPress, children, disabled }) => (
    <SecondaryBorderButtonStyle onPress={onPress} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </SecondaryBorderButtonStyle>
  ),
);
SecondaryBorderButton.displayName = 'SecondaryBorderButton';
