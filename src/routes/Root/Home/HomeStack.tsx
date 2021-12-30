import React, { useCallback } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  default as NotificationIcon,
  default as PeopleSearchIcon,
} from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity as BackButton } from 'react-native';

import { ScreenTransition } from '../../../utils/ScreenTransition';
import HomeView from '../../../containers/HomeFlow/HomeView';
import { COLORS, SHADOWS } from '../../../assets/theme';
import SearchView from '../../../containers/HomeFlow/SearchView';
import { BackText } from '../Record/TasksStack';
import { ROUTES } from '../../RouteNames';

const Stack = createStackNavigator();

const HomeStack = () => {
  const { navigate } = useNavigation();
  const navigateBack = useCallback(() => {
    navigate(ROUTES.HomeView);
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

          headerLeft() {
            return (
              <PeopleSearchIcon
                size={30}
                color={COLORS.opacity06}
                name="md-people-outline"
                onPress={() => navigate('Search')}
              />
            );
          },
          headerRight() {
            return (
              <NotificationIcon
                size={30}
                color={COLORS.opacity06}
                name="notifications-outline"
              />
            );
          },
        }}
      >
        <Stack.Screen
          name={ROUTES.HomeView}
          options={{ headerTitle: 'Home' }}
          component={HomeView}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerRight() {
              return null;
            },
            headerLeft() {
              return (
                <BackButton onPress={navigateBack}>
                  <BackText>Back</BackText>
                </BackButton>
              );
            },
          }}
          name="Search"
          component={SearchView}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
