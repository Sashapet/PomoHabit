import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity as BackButton } from 'react-native';
import { default as OptionIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import { actions, selectors } from '../../../state';
import { ROUTES } from '../../RouteNames';
import { BackText } from './TasksStack';
import MainView from '../../../containers/RecordFlow/MainView';
import { COLORS } from '../../../assets/theme';

const Stack = createStackNavigator();
const MainStack = () => {
  const working = useSelector(selectors.pomodoro.working);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigateHome = useCallback(() => {
    navigation.navigate(ROUTES.HomeView);
  }, []);

  const openPomodoroModal = useCallback(() => {
    dispatch(actions.pomodoro.showPomodoroModal(true));
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
        headerRightContainerStyle: {
          paddingRight: 20,
        },
        headerLeft() {
          return (
            <BackButton onPress={navigateHome}>
              <BackText>Back</BackText>
            </BackButton>
          );
        },
        headerRight() {
          return working ? null : (
            <OptionIcon
              name="dots-vertical"
              size={25}
              color={COLORS.secondary}
              onPress={openPomodoroModal}
            />
          );
        },
      }}
    >
      <Stack.Screen name={ROUTES.MainView} component={MainView} />
    </Stack.Navigator>
  );
};

MainStack.displayName = 'MainStack';

export default MainStack;
