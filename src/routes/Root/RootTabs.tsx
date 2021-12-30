import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import { default as HomeIcon } from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../RouteNames';
import AnimatedIcon from '../../components/AnimatedIcon';
import { COLORS } from '../../assets/theme/colors';
import RecordStack from './Record/RecordStack';
import HomeStack from './Home/HomeStack';
import { actions, selectors } from '../../state';
import ProfileStack from './Profile/ProfileStack';

const Tabs = createBottomTabNavigator();

const HomeTabs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.follow.fetchFollowinUsers());
  }, []);
  const avatar = useSelector(selectors.auth.avatar);

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.secondary,
        inactiveTintColor: COLORS.opacity06,
        showLabel: true,
        labelStyle: {
          fontSize: 13,
          fontWeight: 'bold',
        },
        style: {
          height: 70,
          position: 'absolute',
          paddingBottom: 20,
        },
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon({ focused }) {
            return (
              <HomeIcon
                color={focused ? COLORS.secondary : COLORS.opacity06}
                name="home"
                size={30}
              />
            );
          },
          title: 'home',
        }}
        name={ROUTES.HomeStack}
        component={HomeStack}
      />
      <Tabs.Screen
        options={{
          tabBarIcon({ focused }) {
            return <AnimatedIcon focused={focused} />;
          },
        }}
        name={ROUTES.Record}
        component={RecordStack}
      />

      <Tabs.Screen
        options={{
          tabBarIcon({ focused }) {
            return (
              <ImageBorder focused={focused}>
                <ProfileImage source={{ uri: avatar }} />
              </ImageBorder>
            );
          },
          title: 'You',
        }}
        name={ROUTES.Profile}
        component={ProfileStack}
      />
    </Tabs.Navigator>
  );
};

const ImageBorder = styled.View<{ focused: boolean }>`
  border: ${({ focused, theme }) =>
    focused ? '1.5px solid ' + theme.PRIMARY_BUTTON_COLOR : '0'};
  border-radius: 100px;
  top: 2px;
`;
const ProfileImage = styled.Image`
  width: 29px;
  height: 29px;
  border-radius: 100px;
`;

HomeTabs.displayName = 'HomeTabs';

export default HomeTabs;
