import 'react-native-gesture-handler';
import React, { memo } from 'react';
import { Provider } from 'react-redux';

import Dashboard from './Dashboard';
import { store } from './state/store';

const App = memo(() => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
));
App.displayName = 'App';
export default App;
