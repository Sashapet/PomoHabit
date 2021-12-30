import React, { useCallback, useEffect } from 'react';
import { Svg } from 'react-native-svg';
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { actions } from '../../../state';
import AnimatedLogo from './AnimatedLogo';
import {
  height,
  MARGIN,
  svgHeight,
  svgStrokePath,
  svgWidth,
  width,
} from '../../../utils/svg/svgStroke';
import AnimatedStroke from './AnimatedStroke';

const Splash = () => {
  const progress = useSharedValue(0);
  const dispatch = useDispatch();
  const dispatchAction = useCallback(
    () => dispatch(actions.theme.splashLoaded()),
    [],
  );
  useEffect(() => {
    progress.value = withTiming(
      1,
      { duration: 1700, easing: Easing.linear },
      () => {
        'worklet';
        runOnJS(dispatchAction)();
      },
    );
  }, [progress]);

  return (
    <SplashContainer>
      <AnimatedLogo progress={progress} />
      <Svg
        width={width}
        height={height}
        viewBox={[
          -MARGIN / 2,
          -MARGIN / 2,
          svgWidth + MARGIN / 2,
          svgHeight + MARGIN / 2,
        ].join(' ')}
      >
        {svgStrokePath.map((d, key) => (
          <AnimatedStroke progress={progress} d={d} key={key} />
        ))}
      </Svg>
    </SplashContainer>
  );
};
const SplashContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export default Splash;
