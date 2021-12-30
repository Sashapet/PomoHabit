import React, { memo } from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';

const CloseUpButtonStyle = styled.TouchableWithoutFeedback<{
  disabled: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.darkScreen};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface CloseUpButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  disabled: boolean;
}
export const CloseUpArea: React.FC<CloseUpButtonProps> = memo(
  ({ onPress, children, disabled }) => (
    <CloseUpButtonStyle disabled={disabled} onPress={onPress}>
      {children}
    </CloseUpButtonStyle>
  ),
);
CloseUpArea.displayName = 'CloseUpArea';
