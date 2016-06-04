import { IndexRoute, Route, IndexRedirect} from 'react-router';
import React from 'react';

import { push } from 'react-router-redux';

import LoginCard from '../components/login'
import Dashboard from '../components/dashboard'


import App from '../container'
import AuthenticatedContainer from '../container/authenticated'


export default function configRoutes(store){
  const _ensureAuthenticated = (nextState, replace, callback) => {
    const { dispatch } = store;
    const { session } = store.getState();
    const { username } = session;
    const token = localStorage.getItem('PiControlToken')

    if (!username && token ) {
      //dispatch({type: "VERIFY_TOKEN", token: token});
    } else if (!localStorage.getItem('PiControlToken')) {
      replace('/login');
    }

    callback();
  };

  return (<Route component={App}>
          <Route path="/login" component={LoginCard} />

          <Route path="/" component={AuthenticatedContainer} onEnter={_ensureAuthenticated}>
            <Route path="home" component={Dashboard} />
          </Route>
    </Route>
    )
  }
