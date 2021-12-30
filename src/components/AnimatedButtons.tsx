import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ViewProps } from 'react-native';

import { wWidth } from '../utils/helpers/helpers';
import { SkipEndBtn } from './styled/Buttons/SkipEndBtn';
import { PlayStopBtn } from './styled/Buttons/PlayStopBtn';
import { actions, selectors } from '../state';

const smallSize = wWidth * 0.2;
const bigSize = wWidth * 0.3;

const AnimatedButtons = () => {
  const dispatch = useDispatch();
  const started = useSelector(selectors.pomodoro.started);
  const startButton = useSelector(selectors.pomodoro.startButton);
  const resetTimer = useSelector(selectors.pomodoro.resetTimer);

  const openSkipModal = useCallback(() => {
    dispatch(actions.pomodoro.showModal({ state: true, type: 'skip' }));
  }, []);
  const openFinishModal = useCallback(() => {
    dispatch(actions.pomodoro.showModal({ state: true, type: 'finish' }));
  }, []);

  const config = {
    duration: 400,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  };

  const calledOnce = useRef(true);

  useEffect(() => {
    if (resetTimer) {
      moveValue.value = 0;
      calledOnce.current = true;
    }
  }, [resetTimer]);

  // START TIMER
  const handleStart = useCallback(() => {
    dispatch(actions.pomodoro.changeButton(false));
    dispatch(actions.pomodoro.timerStart());
    if (calledOnce.current) {
      dispatch(actions.pomodoro.setWorking(true));
      calledOnce.current = false;
    }
    moveValue.value = withTiming(0, config);
  }, []);
  const handleStop = useCallback(() => {
    dispatch(actions.pomodoro.timerStop());
    moveValue.value = withTiming(bigSize, config);
  }, []);

  const moveValue = useSharedValue(0);

  const leftStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ translateX: moveValue.value }],
  }));

  const rightStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ translateX: -moveValue.value }],
  }));

  //DISABLE WHILE ANIMATING
  const skipDisabledProps = useAnimatedProps<ViewProps>(
    () => ({ pointerEvents: moveValue.value < bigSize ? 'none' : 'auto' }),
    [moveValue],
  );
  const FinishDisbledProps = useAnimatedProps<ViewProps>(
    () => ({ pointerEvents: moveValue.value < bigSize ? 'none' : 'auto' }),
    [moveValue],
  );

  return (
    <ButtonContainer>
      <Animated.View animatedProps={skipDisabledProps} style={rightStyle}>
        <SkipEndBtn size={smallSize} onPress={openSkipModal}>
          Skip
        </SkipEndBtn>
      </Animated.View>

      {!started ? (
        <PlayStopBtn size={bigSize} onPress={handleStart}>
          {startButton ? 'START' : 'RESUME'}
        </PlayStopBtn>
      ) : (
        <PlayStopBtn size={bigSize} onPress={handleStop}>
          PAUSE
        </PlayStopBtn>
      )}
      <Animated.View animatedProps={FinishDisbledProps} style={leftStyle}>
        <SkipEndBtn size={smallSize} onPress={openFinishModal}>
          Finish
        </SkipEndBtn>
      </Animated.View>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export default AnimatedButtons;
