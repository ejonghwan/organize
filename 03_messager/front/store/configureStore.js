import { createWrapper } from "next-redux-wrapper";
import { compose, createStore, applyMiddleware } from 'redux'
import reducer from '../reducers/index.js'
import { composeWithDevTools } from 'redux-devtools-extension'

// saga
import createSaga from 'redux-saga'
import rootSaga from '../sagas/index.js'

import React from 'react';

const configureStore = () => {
  const saga = createSaga()
  const middleware = [saga]
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleware)) : composeWithDevTools(applyMiddleware(...middleware))

  const store = createStore(reducer, enhancer)
  store.sagaTask = saga.run(rootSaga)
  return store
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === "development", //true면 디버거로 자세한 사항을 볼 수 있음
});

export default wrapper