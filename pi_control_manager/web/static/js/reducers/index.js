import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import * as actions from "../actions"

const initialAlertState = {
  loading: {
    visible: false,
    value: null
  },
  visible_alerts: [],
}


const intitialSessionState = {
  username: null,
  admin: null,
}

function alertReducer(state = initialAlertState, action){
  switch (action.type) {
    
    case actions.ADD_ALERT:
        return {...state, visible_alerts: [action.id, ...state.visible_alerts]}
    case actions.REMOVE_ALERT:
        let new_alerts =  state.visible_alerts.map((a)=>{a !== action.id})
      return {...state, visible_alerts: new_alerts}

    case actions.LOADING:
      return {...state, loading: {visible: true, value: action.value || null}}

    case actions.STOP_LOADING:
      return {...state, loading: {visible: false, value: null}}
    default:
    return state

  }

}

function sessionReducer(state = intitialSessionState, action) {
 switch (action.type) {

   case actions.USER_LOGIN:
      return {...state, username: action.username, admin: action.admin}

  case actions.USER_LOGOUT:
     return intitialSessionState;

   default:
     return state
  }

}



export default combineReducers({
  routing: routerReducer,
  session: sessionReducer,
  alerts: alertReducer
});
