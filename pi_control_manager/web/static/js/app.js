import "babel-polyfill"
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
//import { browserHistory  } from 'react-router'
import { Router, RoutingContext } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { sagaMiddleware, node} from './store'
import configRoutes from './routes';
//import rootSaga from './sagas';

injectTapEventPlugin();

const target = document.getElementById("react-root");

ReactDOM.render(node, target);
