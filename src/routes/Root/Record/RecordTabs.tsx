import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { default as ListIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as WatchIcon } from 'react-native-vector-icons/Fontisto';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import TasksStack from './TasksStack';
import { wHeight, wWidth } from '../../../utils/helpers/helpers';
import MainStack from './MainStack';
import { COLORS } from '../../../assets/theme';
import { ROUTES } from '../../RouteNames';

const Tabs = createBottomTabNavigator();
const RecordTabs = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
  }, [navigation]);

  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: wHeight * 0.1,
          maxHeight: 70,
          borderRadius: 15,
          position: 'absolute',
          bottom: 25,
          left: wWidth * 0.3,
          right: wWidth * 0.3,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
      initialRouteName="MainStack"
    >
      <Tabs.Screen
        options={{
          tabBarIcon({ focused }) {
            return (
              <RecordTabContainer focused={focused}>
                <ListIcon
                  color={focused ? COLORS.secondary : COLORS.opacity06}
                  size={30}
                  name="format-list-bulleted"
                />
              </RecordTabContainer>
            );
          },
        }}
        name={ROUTES.TasksStack}
        component={TasksStack}
      />
      <Tabs.Screen
        options={{
          tabBarIcon({ focused }) {
            return (
              <RecordTabContainer focused={focused}>
                <WatchIcon
                  size={30}
                  color={focused ? COLORS.secondary : COLORS.opacity06}
                  name="stopwatch"
                />
              </RecordTabContainer>
            );
          },
        }}
        name={ROUTES.MainStack}
        component={MainStack}
      />
    </Tabs.Navigator>
  );
};

const RecordTabContainer = styled.View<{ focused: boolean }>`
  width: 100%;
  height: 100%;
  align-items: center;
  border-radius: 15px;
  justify-content: center;
  background-color: ${({ theme, focused }) =>
    focused ? theme.colors.opacity03 : theme.colors.white};
`;
RecordTabs.displayName = 'RecordTabs';

export default RecordTabs;
