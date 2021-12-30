import React, { useRef, useState } from 'react';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { COLORS } from '../../../assets/theme/colors';
import {
  AnimatedCircle,
  AnimatedClockPointer,
  AnimatedG,
  AnimatedLine,
} from './AnimatedComponents';
import { height, svgHeight, svgWidth, width } from '../../../utils/svg/svgLogo';

interface AnimatedLogoProps {
  progress: Animated.SharedValue<number>;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ progress }) => {
  const ref = useRef(null);
  const [length, setLength] = useState(0);
  //animate circle path
  const animatedCircle = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.65, 0, 0.35, 1)(progress.value),
  }));
  //animate opacity
  const animatedOpacity = useAnimatedProps(() => ({
    opacity: interpolate(progress.value, [0, 0.5], [0, 1], Extrapolate.CLAMP),
  }));

  const rotateAnimation = (target: number) => () => {
    'worklet';
    return {
      transform: [{ rotate: `${target * progress.value}rad` }],
    };
  };

  const rotateStyle1 = useAnimatedStyle(rotateAnimation(Math.PI * 2));

  return (
    <>
      <Svg
        width={width}
        height={height}
        viewBox={[0, 0, svgWidth, svgHeight].join(' ')}
      >
        <Circle
          cx="202.5"
          cy="207.5"
          r="20.5"
          stroke={COLORS.greyish}
          strokeWidth="18"
        />
        {/* pointer rotation animation */}
        <Animated.View style={rotateStyle1}>
          <Svg
            width={width}
            height={height}
            viewBox={[0, 0, svgWidth, svgHeight].join(' ')}
          >
            <AnimatedClockPointer
              x1="294"
              y1="208"
              x2="228"
              y2="208"
              stroke={COLORS.greyish}
              strokeWidth="18"
            />
          </Svg>
        </Animated.View>
        <AnimatedClockPointer
          x1="203"
          y1="98"
          x2="203"
          y2="182"
          stroke={COLORS.greyish}
          strokeWidth="18"
        />
        {/* Animated opacity group */}
        <AnimatedG animatedProps={animatedOpacity}>
          <AnimatedLine
            x1="327.636"
            y1="408.364"
            x2="298.636"
            y2="379.364"
            stroke={COLORS.greyish}
            strokeWidth="18"
          />

          <AnimatedLine
            x1="81.636"
            y1="406.636"
            x2="110.636"
            y2="377.636"
            stroke={COLORS.greyish}
            strokeWidth="18"
          />

          <AnimatedLine
            x1="204"
            y1="36"
            x2="204"
            y2="56"
            stroke={COLORS.secondary}
            strokeWidth="10"
          />

          <AnimatedLine
            x1="204"
            y1="358"
            x2="204"
            y2="378"
            stroke={COLORS.secondary}
            strokeWidth="10"
          />

          <AnimatedLine
            x1="358"
            y1="208"
            x2="378"
            y2="208"
            stroke={COLORS.secondary}
            strokeWidth="10"
          />

          <AnimatedLine
            x1="37"
            y1="208"
            x2="57"
            y2="208"
            stroke={COLORS.secondary}
            strokeWidth="10"
          />
        </AnimatedG>
        <AnimatedCircle
          animatedProps={animatedCircle}
          onLayout={() => setLength(ref.current.getTotalLength())}
          ref={ref}
          cx="207.5"
          cy="207.5"
          r="190.5"
          stroke={COLORS.secondary}
          strokeWidth="34"
          strokeDasharray={length}
        />
      </Svg>
    </>
  );
};

export default AnimatedLogo;
