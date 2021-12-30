import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { ScreenTransition } from '../../../utils/ScreenTransition';
import FinishStack from './FinishStack';
import RecordTabs from './RecordTabs';
import { ROUTES } from '../../RouteNames';

const Stack = createStackNavigator();
const RecordStack = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
  }, [navigation]);

  const CardOptions = {
    ...ScreenTransition,
  };

  return (
    <Stack.Navigator screenOptions={CardOptions as StackNavigationOptions}>
      <Stack.Screen name={ROUTES.RecordTabs} component={RecordTabs} />
      <Stack.Screen name={ROUTES.FinishStack} component={FinishStack} />
    </Stack.Navigator>
  );
};
RecordStack.displayName = 'RecordStack';

export default RecordStack;
