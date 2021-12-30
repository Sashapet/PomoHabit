import React, { useState } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { ROUTES } from '../RouteNames';
// import styled from 'styled-components/native';
import { ScreenTransition } from '../../utils/ScreenTransition';
import WelcomeView from '../../containers/LoginFlow/WelcomeView';
import LoginView from '../../containers/LoginFlow/LoginView';
import RegisterView from '../../containers/LoginFlow/RegisterView';
import ForgotPasswordView from '../../containers/LoginFlow/ForgotPasswordView';
// import Toggle from '../../components/Toggle';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const CardOptions = {
    ...ScreenTransition,
  };

  return (
    <>
      <Stack.Navigator screenOptions={CardOptions as StackNavigationOptions}>
        {showWelcome && (
          <Stack.Screen name={ROUTES.Welcome}>
            {() => <WelcomeView setShowWelcome={setShowWelcome} />}
          </Stack.Screen>
        )}
        <Stack.Screen name={ROUTES.Login} component={LoginView} />
        <Stack.Screen name={ROUTES.Register} component={RegisterView} />
        <Stack.Screen
          name={ROUTES.ForgotPassword}
          component={ForgotPasswordView}
        />
      </Stack.Navigator>
      {/* <ToggleAbsoluteContainer>
        <Toggle language={true} />
        <Toggle themeToggle={true} />
      </ToggleAbsoluteContainer> */}
    </>
  );
};
// const ToggleAbsoluteContainer = styled.View`
//   position: absolute;
//   flex-direction: row;
//   right: 0;
//   top: 0;
// `;

export default AuthStack;
