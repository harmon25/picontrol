import "babel-polyfill"
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { browserHistory  } from 'react-router'
import { Router, RoutingContext,  hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'


import configureStore from './store';
import configRoutes from './routes';
import rootSaga from './sagas';

injectTapEventPlugin();

const sagaMiddleware = createSagaMiddleware()
const store = configureStore(hashHistory, sagaMiddleware);
const history = syncHistoryWithStore(hashHistory, store)

sagaMiddleware.run(rootSaga)

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

const target = document.getElementById("react-root");
const node = <Root routerHistory={history} store={store} />;

ReactDOM.render(node, target);
