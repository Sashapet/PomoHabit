import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { selectors } from './state';
import Navigator from './routes/Navigator';

const Dashboard: React.FC = memo(() => {
  const theme = useSelector(selectors.theme.theme);

  return (
    <ThemeProvider theme={theme}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <FlexContainer>
          <FlexContainer>
            <Navigator />
          </FlexContainer>
        </FlexContainer>
      </TouchableWithoutFeedback>
    </ThemeProvider>
  );
});
const FlexContainer = styled.View`
  flex: 1;
`;

Dashboard.displayName = 'Dashboard';

export default Dashboard;
