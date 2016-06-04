import {  delay } from 'redux-saga'
import { call, put, take, fork, select, spawn } from 'redux-saga/effects'
import { push } from 'react-router-redux';
import {alertSelector, sessionSelector, dispatchSelector} from '../reducers/selectors'
import Alert from 'react-s-alert';
import {Api, checkToken, createAxiosInstance} from '../services'
import * as actions from '../actions'


function* startUp(getState){
  try {
    console.log("checking token")
    var token = yield call(checkToken)
    yield put(actions.verifyToken(token))

  } catch (e){
    yield put(actions.newAlert({alert: "info", msg: `You need to login!`}));
  }
}


// spawned saga used to
function* waitForAlert(id, timeout){
  yield delay(timeout)
  yield put(actions.closeAlert(id))
}
// just used to keep a better handle on errors. have side effect in one place
// and triggered via a dispatched action
function* alertWatcher(getState){
  while(true){
    const action = yield take("ALERT")
    Alert[action.alert](action.msg,
        {timeout: action.timeout || 2500,
    })
  }
}

function* watchUserLogin(getState) {

  while (true) {
    // user either has to login, or there is a token to verify, either way they
    // will start a 'session' or app instance one a token has been verified
    const action = yield take(["USER_LOGIN", "VERIFY_TOKEN"])
    //yield put(actions.startLoading())
    var token;
    // try will catch ajax erros for both login, and fetching user ajax calls
    try {
      if(action.type == 'USER_LOGIN'){
        // login user, returns data object with a token
        const { data } = yield call(Api.userLogin, action.user, action.password);
        token = data.token
        // put token in local storage
        localStorage.setItem('PiControlToken', data.token);

      } else if(action.type == "VERIFY_TOKEN") {
        // OK we already had a token, now just fetch the user
        token = action.token
      }
      // pass token to create an axios instance with Authorization header
      const axios = createAxiosInstance(token)
      // make a request with new auth header
      const { data } = yield call(Api.verifyToken, axios);
      // if the token is good should get back info about the user token belongs to
      console.log(data);

      // now we can start an app 'session' on the client, and move past login screen
      yield put(actions.startSession(data.user, data.admin, axios));
      //const action = yield take("START_SESSION")
      yield put(push("/home"))
      yield put(actions.stopLoading())


      // we are done loading.
      //yield put(actions.stopLoading())

      /// login flow stops here, waiting for a call to logout
      // logging out will remove token and reset client state.
      const session = yield select(sessionSelector);
      yield take("USER_LOGOUT");
      localStorage.removeItem('PiControlToken');
      yield put(actions.newAlert({alert: "success", msg: `Goodbye ${session.username}!`}));
      yield put(push("/login"))

    } catch(e){
        // will catch rejected promises, including axios requests that respond as not OK
        yield put(actions.stopLoading())
        if(e.status == 404){
          yield put(actions.newAlert({alert: "error", msg: "Server Error"}));
        } else if(e.status == 401){
          yield put(actions.newAlert({alert: "warning", msg: "Invalid Login"}));
        }
        console.log(e)
     }
  }
}


export default function* rootSaga() {
  yield fork(startUp)
  yield fork(alertWatcher)
  yield fork(watchUserLogin)
}
