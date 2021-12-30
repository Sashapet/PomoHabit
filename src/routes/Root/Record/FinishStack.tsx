import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity as BackButton } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../RouteNames';
import { actions } from '../../../state';
import FinishView from '../../../containers/RecordFlow/FinishView';
import { BackText } from './TasksStack';

const Stack = createStackNavigator();
const FinishStack = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  //RESET FINISH TIME
  const navigateBack = useCallback(() => {
    goBack();
    dispatch(actions.pomodoro.finish(false));
    dispatch(actions.pomodoro.setFinishTime({ min: null, sec: null }));
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'SAVE ACTIVITY',
        headerTitleAlign: 'center',
        headerRightContainerStyle: {
          paddingRight: 20,
        },
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
        headerLeft() {
          return (
            <BackButton onPress={navigateBack}>
              <BackText>Resume</BackText>
            </BackButton>
          );
        },
      }}
    >
      <Stack.Screen name={ROUTES.FinishView} component={FinishView} />
    </Stack.Navigator>
  );
};
FinishStack.displayName = 'FinishStack';

export default FinishStack;
