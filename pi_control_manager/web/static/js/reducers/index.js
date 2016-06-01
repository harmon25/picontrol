import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import {USER_LOGIN,USER_LOGOUT,LOGIN_OK,LOGIN_FAIL,CLEAR_ALERT} from "../actions"

const cleared_alert = {type: null, msg: null, timeout: null}
const intitialState = {
  loggingIn: false,
  loggedIn: false,
  user: null,
  admin: null,
  alert: cleared_alert
}

function sessionReducer(state = intitialState, action) {
 switch (action.type) {

   case USER_LOGIN:
      return {...state, loggingIn: true}

  case USER_LOGOUT:
     return intitialState;

   case LOGIN_OK:
      const ok_alert = createAlert("success", action.message, action.timeout);
      return {...state, user: action.username, loggingIn: false, admin: action.admin, alert: ok_alert}

   case LOGIN_FAIL:
     const fail_alert = createAlert("error", action.message, action.timeout);
     return {...state, loggingIn: false, alert: fail_alert}

   case CLEAR_ALERT:
     return {...state, alert: cleared_alert}

   default:
     return state
  }

}


function createAlert(type, msg, timeout){
  return {type: type, msg: msg, timeout: timeout}
}


export default combineReducers({
  routing: routerReducer,
  session: sessionReducer
});
