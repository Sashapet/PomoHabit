import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { actions, selectors } from '../../state';
import { COLORS } from '../../assets/theme';
import { wHeight } from '../../utils/helpers/helpers';

const ToastMessage = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectors.messages.notification);
  const [messageState, setMessageState] = useState({
    color: null,
    title: null,
    message: null,
  });
  //LISTENER
  useEffect(() => {
    if (notification.type) {
      setMessageState({
        color:
          notification.type === 'error' ? COLORS.checkRed : COLORS.checkGreen,
        title: notification.type === 'error' ? 'Error' : 'Success',
        message: notification.message,
      });
      handleAnimate();
    }
  }, [notification]);

  const moveValue = useSharedValue(0);
  const toastHeight = wHeight * 0.12;

  const config = {
    duration: 400,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  };
  const handleAnimate = useCallback(() => {
    moveValue.value = withTiming(toastHeight, config, () => {
      moveValue.value = withDelay(
        2500,
        withTiming(0, config, () => {
          'worklet';
          runOnJS(cleanMessage)();
        }),
      );
    });
  }, []);

  const cleanMessage = useCallback(() => {
    dispatch(actions.messages.cleanUp());
    setMessageState({
      color: null,
      title: null,
      message: null,
    });
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    height: toastHeight,
    width: '100%',
    position: 'absolute',
    top: -toastHeight,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    zIndex: 1,
    transform: [{ translateY: moveValue.value }],
  }));

  return (
    <Animated.View
      style={[
        animStyle,
        {
          backgroundColor: messageState.color,
        },
      ]}
    >
      <TextContainer>
        <HeaderOne>{messageState.title}</HeaderOne>
        <HeaderTwo>{messageState.message}</HeaderTwo>
      </TextContainer>
    </Animated.View>
  );
};

const HeaderOne = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.NunitoExtraBold};
  font-size: 17px;
`;
const HeaderTwo = styled.Text`
  color: ${({ theme }) => theme.colors.opacity07};
  font-family: ${({ theme }) => theme.fonts.NunitoSemiBold};
  font-size: 14px;
`;

const TextContainer = styled.View`
  padding: 10px;
`;

export default ToastMessage;
