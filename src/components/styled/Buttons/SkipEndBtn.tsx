import React, { memo } from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';

//SKIP END BUTTON
const SkipEndBtnStyle = styled.TouchableOpacity<{
  size: number;
}>`
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.opacity03};
  align-items: center;
  justify-content: center;
  elevation: -10;
`;

const SkipEndBtnText = styled.Text`
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
`;

interface SkipEndBtnProps {
  size: number;
  onPress: (event: GestureResponderEvent) => void;
}

//ANIMATION

export const SkipEndBtn: React.FC<SkipEndBtnProps> = memo(
  ({ onPress, children, size }) => (
    <SkipEndBtnStyle size={size} onPress={onPress}>
      <SkipEndBtnText>{children}</SkipEndBtnText>
    </SkipEndBtnStyle>
  ),
);
SkipEndBtn.displayName = 'SkipEndBtn';
