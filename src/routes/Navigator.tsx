import React, { memo, useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import RNBootSplash from 'react-native-bootsplash';

import ToastMessage from '../components/ToastAnimaton/Toast';
import Splash from '../components/SplashScreens/animated/Splash';
import AuthStack from './Auth/AuthStack';
import { actions, selectors } from '../state';
import RootTabs from './Root/RootTabs';

const Navigator = memo(() => {
  const dispatch = useDispatch();
  const user = useSelector(selectors.auth.user);
  const splashLoaded = useSelector(selectors.theme.splashLoaded);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  useEffect(() => {
    //IF USER LOGGED IN -> DONT SHOW ANIMATED SPLASH SCREEN
    if (user) {
      RNBootSplash.hide();
      dispatch(actions.theme.splashLoaded());
    } else if (user === null) {
      RNBootSplash.hide();
    }
  }, [user]);

  return (
    <FlexContainer>
      {!splashLoaded && user === null ? (
        <Splash />
      ) : (
        <NavigationContainer theme={MyTheme}>
          <ToastMessage />

          {user ? <RootTabs /> : <AuthStack />}
        </NavigationContainer>
      )}
    </FlexContainer>
  );
});

const FlexContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightBlue};
`;
Navigator.displayName = 'Navigator';

export default Navigator;
