import {
  StackCardInterpolationProps,
  TransitionSpecs,
} from '@react-navigation/stack';

import { COLORS } from '../assets/theme';

export const ScreenTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerShown: false,
  cardStyleInterpolator: ({
    current,
    next,
    layouts,
  }: StackCardInterpolationProps) => ({
    cardStyle: {
      backgroundColor: COLORS.lightBlue,
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
        {
          translateX: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -layouts.screen.width],
              })
            : 1,
        },
      ],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  }),
};
