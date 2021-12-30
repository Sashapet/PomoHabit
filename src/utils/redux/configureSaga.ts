// fixes duplicate sagas when using React Native fast refresh
// https://github.com/redux-saga/redux-saga/issues/1961

// let sagaRunner;

// export default (sagaMiddleware, rootSaga) => {
//   if (__DEV__ && module.hot && sagaRunner) {
//     sagaRunner.cancel();
//   }

//   sagaRunner = sagaMiddleware.run(rootSaga);
// };
