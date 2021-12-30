import React, { memo } from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';

const DeleteButtonStyle = styled.Text<{ disabled: boolean }>`
  color: ${({ theme }) => theme.colors.red};
  font-size: 20px;
  align-self: center;
  font-family: ${({ theme }) => theme.fonts.NunitoBold};
`;

interface DeleteButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  disabled: boolean;
}
export const DeleteButton: React.FC<DeleteButtonProps> = memo(
  ({ onPress, children, disabled }) => (
    <DeleteButtonStyle disabled={disabled} onPress={onPress}>
      {children}
    </DeleteButtonStyle>
  ),
);
DeleteButton.displayName = 'DeleteButton';
