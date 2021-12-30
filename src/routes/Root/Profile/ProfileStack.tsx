import React, { useCallback } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { default as SignOutIcon } from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';

import ProfileView from '../../../containers/ProfileFlow/ProfileView';
import { ScreenTransition } from '../../../utils/ScreenTransition';
import { COLORS, SHADOWS } from '../../../assets/theme';
import { actions } from '../../../state';
import { ROUTES } from '../../RouteNames';

const Stack = createStackNavigator();

const ProfileStack = () => {
  const dispatch = useDispatch();
  const handleLogOut = useCallback(async () => {
    dispatch(actions.auth.showLogOutModal(true));
  }, []);
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          ...(ScreenTransition as StackNavigationOptions),
          headerShown: true,
          headerStatusBarHeight: 0,
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          headerStyle: {
            ...SHADOWS.ButtonShadow,
          },
          headerTitleAlign: 'center',

          headerRight() {
            return (
              <SignOutIcon
                onPress={handleLogOut}
                size={30}
                color={COLORS.opacity06}
                name="log-out"
              />
            );
          },
        }}
      >
        <Stack.Screen
          name={ROUTES.ProfileView}
          options={{ headerTitle: 'You' }}
          component={ProfileView}
        />
      </Stack.Navigator>
    </>
  );
};
export default ProfileStack;
