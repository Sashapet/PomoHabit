import React, { memo } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, ViewProps } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { COLORS, SHADOWS } from '../../../assets/theme';

const PlayStopBtnText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  align-self: center;
`;

interface PlayStopBtnProps {
  size: number;
  onPress: () => void;
}
export const PlayStopBtn: React.FC<PlayStopBtnProps> = memo(
  ({ onPress, children, size }) => {
    const colorValue = useSharedValue(0);
    //ANIMATED TOUCHABLE
    const AnimatedTouchable =
      Animated.createAnimatedComponent(TouchableOpacity);
    //STYLE CHANGE
    const bgColor = useAnimatedStyle(() => ({
      borderRadius: 100,
      justifyContent: 'center',
      zIndex: 20,
      backgroundColor: interpolateColor(
        colorValue.value,
        [0, 1],
        [COLORS.secondary, COLORS.lightBlue],
      ),
      opacity: interpolate(colorValue.value, [0, 1], [1, 0.7]),
    }));
    //DISABLE WHILE ANIMATING
    const disabledProps = useAnimatedProps<ViewProps>(
      () => ({ pointerEvents: colorValue.value > 0 ? 'none' : 'auto' }),
      [colorValue],
    );

    return (
      <Animated.View
        style={[bgColor, SHADOWS.ButtonShadow]}
        animatedProps={disabledProps}
      >
        <AnimatedTouchable
          activeOpacity={1}
          onPress={() => {
            onPress();
            colorValue.value = withRepeat(
              withTiming(1, {
                duration: 400,
              }),
              2,
              true,
            );
          }}
          style={[{ width: size, height: size }, bgColor]}
        >
          <PlayStopBtnText>{children}</PlayStopBtnText>
        </AnimatedTouchable>
      </Animated.View>
    );
  },
);

PlayStopBtn.displayName = 'PlayStopBtn';
