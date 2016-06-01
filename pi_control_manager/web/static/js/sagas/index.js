import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, take, fork } from 'redux-saga/effects'

import {Api} from '../services'




// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* userLogin(action) {
   try {
      const data = yield call(Api.userLogin, action.user, action.password);
      yield put({type: "LOGIN_OK", username: action.user, admin: true, message: `Hi ${action.username}!`, timeout: null});
   } catch (e) {
      console.log(e)
      yield put({type: "LOGIN_FAIL", message: e.message, timeout: null});
   }
}


/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export function* mySagas() {
  yield* takeEvery("USER_LOGIN", userLogin);
}
