import React, { memo, useCallback, useEffect } from 'react';
import { default as RecordIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  cancelAnimation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import { selectors } from '../state';
import { COLORS } from '../assets/theme';

const AnimatedTab: React.FC<{ focused: boolean }> = memo(({ focused }) => {
  const working = useSelector(selectors.pomodoro.working);
  useEffect(() => {
    if (working) {
      startAnimation();
    } else {
      cancelAnimation(colorValue);
      colorValue.value = 0.5;
    }
  }, [working]);

  const AnimatedIcon = Animated.createAnimatedComponent(RecordIcon);
  const AnimatedView = Animated.createAnimatedComponent(View);

  const colorValue = useSharedValue(0.5);

  const startAnimation = useCallback(
    () =>
      (colorValue.value = withRepeat(
        withTiming(1, {
          duration: 1100,
        }),
        -1,
        true,
      )),
    [],
  );

  const animatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      colorValue.value,
      [0, 1],
      [COLORS.opacity06, COLORS.secondary],
    );
    return {
      color,
    };
  });
  const animatedViewStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    bottom: -20,
    height: 51,
    width: '70%',
    zIndex: -1,
    backgroundColor: COLORS.lightBlue,
    opacity: interpolate(colorValue.value, [0, 1], [0.5, 1]),
  }));

  return (
    <>
      <AnimatedIcon
        style={animatedStyle}
        color={focused ? COLORS.secondary : COLORS.opacity06}
        name="record-circle-outline"
        size={30}
      />
      <AnimatedView style={working && animatedViewStyle} />
    </>
  );
});

AnimatedTab.displayName = 'AnimatedTab';

export default AnimatedTab;
