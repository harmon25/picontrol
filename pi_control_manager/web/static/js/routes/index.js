import { IndexRoute, Route, IndexRedirect} from 'react-router';
import React from 'react';
import { push } from 'react-router-redux';



import App from '../container'


export default function configRoutes(store){


  return (<Route path="/" component={App}>

        </Route>
    )
  }
