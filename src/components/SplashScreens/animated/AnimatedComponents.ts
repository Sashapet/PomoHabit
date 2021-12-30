import { LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  Circle,
  CircleProps,
  G,
  Line,
  LineProps,
  Path,
  PathProps,
} from 'react-native-svg';

export const AnimatedClockPointer = Animated.createAnimatedComponent<
  LineProps & { onLayout?: (event: LayoutChangeEvent) => void }
>(Line);
//animated opacity group
export const AnimatedG = Animated.createAnimatedComponent(G);
//adding missing library prop onLayout
export const AnimatedLine = Animated.createAnimatedComponent<
  LineProps & { onLayout?: (event: LayoutChangeEvent) => void }
>(Line);
//adding missing library prop onLayout
export const AnimatedCircle = Animated.createAnimatedComponent<
  CircleProps & { onLayout?: (event: LayoutChangeEvent) => void }
>(Circle);
//adding missing library prop onLayout
export const AnimatedPath = Animated.createAnimatedComponent<
  PathProps & { onLayout?: (event: LayoutChangeEvent) => void }
>(Path);
