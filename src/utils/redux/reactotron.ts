import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { NativeModules } from 'react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';

export const initReactotron = () => {
  const scriptURL = NativeModules.SourceCode.scriptURL || 'http://10.20.0.254';
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];

  Reactotron.configure({
    host: scriptHostname,
  })
    .useReactNative({ errors: false })
    .use(reactotronRedux())
    .setAsyncStorageHandler(AsyncStorage)
    .use(sagaPlugin({}))
    .connect()
    .clear();

  return Reactotron;
};
