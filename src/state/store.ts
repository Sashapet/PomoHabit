import createSagaMiddleware from 'redux-saga';
import { compact } from 'lodash';
import { applyMiddleware, compose, createStore } from 'redux';
import { Reactotron } from 'reactotron-core-client';
import { ReactotronReactNative } from 'reactotron-react-native';

import { rootSaga } from './sagas';
import { rootReducer, RootState } from './reducers';
import { initReactotron } from '../utils/redux/reactotron';
import storeRegistry from '../utils/redux/storeRegistry';

declare global {
  interface Console {
    tron: Reactotron<ReactotronReactNative> & ReactotronReactNative;
  }
}
const configStore = (initialState?: RootState) => {
  let sagaMonitor = undefined;
  let reactorEnhancer = undefined;
  const Reactotron = initReactotron();
  sagaMonitor = Reactotron.createSagaMonitor();
  reactorEnhancer = Reactotron.createEnhancer();
  console.tron = Reactotron;

  // else {
  //   console.tron = { log: () => null, error: () => null };
  // }
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const appliedMiddleware = applyMiddleware(sagaMiddleware);
  const enhancers = compose(...compact([appliedMiddleware, reactorEnhancer]));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = createStore(rootReducer, initialState, enhancers as any);
  sagaMiddleware.run(rootSaga);
  return { store };
};

const { store } = configStore();
storeRegistry.register(store);
export { store };
