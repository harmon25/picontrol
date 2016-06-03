import {  delay } from 'redux-saga'
import { call, put, take, fork, select, spawn } from 'redux-saga/effects'

import {alertSelector, sessionSelector, dispatchSelector} from '../reducers/selectors'
import Alert from 'react-s-alert';
import {Api, checkToken} from '../services'
import * as actions from '../actions'


function* startUp(getState){
  try {
    console.log("checking token")
    const token = yield call(checkToken)
  } catch (e){
    yield put(actions.newAlert({alert: "info", msg: `You need to login!`}));
  }
}

function* waitForAlert(id, timeout){
  yield delay(timeout)
  yield put(actions.closeAlert(id))
}


function* alertWatcher(getState){
  while(true){
    //const dispatch = yield select(dispatchSelector)
    const action = yield take("ALERT")
    const alert_timeout = 2500
    const alert_id = Alert[action.alert](action.msg,
        {timeout: alert_timeout,
    })
    yield put(actions.addAlert(alert_id))
    yield spawn(waitForAlert, alert_id, alert_timeout)
  }
}

function* watchUserLogin(getState) {
  while (true) {
    const action = yield take("USER_LOGIN")
    yield put(actions.startLoading());
    try {
      const { data } = yield call(Api.userLogin, action.user, action.password);
      console.log(data)
      localStorage.setItem('PiControlToken', data.token);
      yield put(actions.stopLoading());
      yield put(actions.newAlert({alert: "success", msg: `Hi ${action.user}!`}));

      yield take("USER_LOGOUT");
      yield put(actions.newAlert({alert: "success", msg: `Goodbye ${action.user}!`}));


    } catch(e){
        yield put(actions.stopLoading());
        if(e.status == 404){
          yield put(actions.newAlert({alert: "error", msg: "Server Error"}));
        } else if(e.status == 401){
          yield put(actions.newAlert({alert: "warning", msg: "Invalid Login"}));
        }
     }
  }
}

/*
export function create_sAlert(settings){
  return {position: settings.position || 'bottom-right',
          timeout: settings.timeout || 1500,
          effect: settings.position || 'stackslide',
         }
}

export function* genAlertSaga(action){
  console.log(action.settings)
  let alert_id = Alert[action.alert](action.msg, {
   ...action.settings,
    onShow: function(){
      console.log('hi!')
    },
    onClose: function(){
      //action.dispatch({type: "CLEAR_ALERT", {id: alert_id}})
    }
  })

yield put({type: "NEW_ALERT", {id: alert_id, type: action.alert, msg: action.msg}})
}

*/


/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/

export default function* rootSaga() {
  yield fork(startUp)
  yield fork(alertWatcher)
  yield fork(watchUserLogin)
}
