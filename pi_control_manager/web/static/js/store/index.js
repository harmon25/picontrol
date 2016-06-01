import { createStore, applyMiddleware, compose } from 'redux'
import reducers                          from '../reducers'
import createLogger                      from 'redux-logger';
import { routerMiddleware }             from 'react-router-redux';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

export default function configureStore(browserHistory, sagaMiddleware) {
  const reduxRouterMiddleware = routerMiddleware(browserHistory)
  const redux_dev_tool = window.devToolsExtension ? window.devToolsExtension() : f => f

  const enhancer = compose(
      applyMiddleware(reduxRouterMiddleware, sagaMiddleware, loggerMiddleware),
      redux_dev_tool
    )

  return createStore(reducers, enhancer);
}
