import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import * as actions from "../actions"

const intitialSessionState = {
  username: null,
  admin: null,
  axios: null,
}


const intitialLoadingState = {
  visible: false,
  percent: -1,
}

function loadingBarReducer(state = intitialLoadingState, action) {
 switch (action.type) {

  case actions.START_LOADING:
     return {...state, percent: 0, visible: true}

  case actions.UPDATE_LOADING:
    return {...state, percent: action.percent_complete}

  case actions.STOP_LOADING:
     return {...state, percent: -1, visible: false };

   default:
     return state
  }

}


function sessionReducer(state = intitialSessionState, action) {
 switch (action.type) {


  case actions.START_SESSION:
     return {...state, username: action.username, admin: action.admin, axios: action.axios}

  case actions.USER_LOGOUT:
     return intitialSessionState;

   default:
     return state
  }

}

export default combineReducers({
  routing: routerReducer,
  session: sessionReducer,
  loadingBar: loadingBarReducer
});
