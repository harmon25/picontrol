import React, { PropTypes } from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import { Router, RoutingContext } from 'react-router';
import { Provider } from 'react-redux';
import reducers from '../reducers'
import createLogger from 'redux-logger';
import { routerMiddleware, syncHistoryWithStore  } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'
import {  hashHistory } from 'react-router';
import rootSaga from '../sagas';
import configRoutes from '../routes';


function configureStore(browserHist) {
  console.log("configuring store")
  const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
  });

  const sagaMiddleware = createSagaMiddleware()

  const reduxRouterMiddleware = routerMiddleware(browserHist);

  const redux_dev_tool = window.devToolsExtension ? window.devToolsExtension() : f => f

  const enhancer = compose(
      applyMiddleware(reduxRouterMiddleware, sagaMiddleware, loggerMiddleware),
      redux_dev_tool
    )

  return {store: createStore(reducers, enhancer), sagaMiddleware: sagaMiddleware };

}


const propTypes = {
  routerHistory: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const Root = ({ routerHistory, store }) => {
  return (
     <Provider store={store}>
       <Router history={routerHistory}>
         {configRoutes(store)}
       </Router>
     </Provider>
   );

};


const storeObj = configureStore(hashHistory)

storeObj.sagaMiddleware.run(rootSaga)

const history = syncHistoryWithStore(hashHistory, storeObj.store)

export const node = <Root routerHistory={history} store={storeObj.store} />;

export const dispatch = storeObj.store.dispatch



//export const store = storeObj.store;
//export const sagaMiddleware = storeObj.sagaMiddleware;
//export const history = syncHistoryWithStore(hashHistory, storeObj.store)
//export const dispatch = storeObj.store.dispatch
