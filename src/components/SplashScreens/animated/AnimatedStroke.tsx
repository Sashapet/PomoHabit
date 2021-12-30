import React, { useRef, useState } from 'react';
import Animated, { Easing, useAnimatedProps } from 'react-native-reanimated';

import { randomNumb } from '../../../utils/helpers/helpers';
import { COLORS } from '../../../assets/theme/colors';
import { AnimatedPath } from './AnimatedComponents';

interface AnimatedStrokeProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

const colors = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.lightGreen,
  COLORS.white,
];

const AnimatedStroke: React.FC<AnimatedStrokeProps> = ({ d, progress }) => {
  //pick random color
  const stroke = colors[randomNumb(0, 3)];
  const ref = useRef(null);

  const [length, setLength] = useState(0);

  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.61, 1, 0.88, 1)(progress.value),
  }));

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.65, 0, 0.35, 1)(progress.value),
  }));

  return (
    <>
      <AnimatedPath
        animatedProps={strokeAnimation}
        d={d}
        stroke={stroke}
        strokeWidth={10}
        strokeDasharray={length}
      />
      <AnimatedPath
        animatedProps={animatedProps}
        //missing proptype (react-native-svg)
        onLayout={() => setLength(ref.current.getTotalLength())}
        ref={ref}
        d={d}
        stroke={COLORS.white}
        strokeWidth={10}
        strokeDasharray={length}
      />
    </>
  );
};

export default AnimatedStroke;
