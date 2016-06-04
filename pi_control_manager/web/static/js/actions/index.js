export const STARTUP = 'STARTUP';

export const USER_LOGIN = 'USER_LOGIN';
export const VERIFY_TOKEN = 'VERIFY_TOKEN';
export const START_SESSION = 'START_SESSION';
export const USER_LOGOUT = 'USER_LOGOUT';


export const START_LOADING = 'START_LOADING';
export const UPDATE_LOADING = 'UPDATE_LOADING';
export const STOP_LOADING = 'STOP_LOADING';


export const ALERT = 'ALERT';
export const ADD_ALERT = 'NEW_ALERT';
export const REMOVE_ALERT = 'CLOSE_ALERT';



export function userLogin(username,password){
  return {
    type: USER_LOGIN,
    user: username,
    password: password
  }
}

export function startSession(username, admin, axios){
  return {type: START_SESSION, username: username, admin: admin, axios: axios}
}

export function userLogout(){
  return {type: USER_LOGOUT}
}

export function verifyToken(token){
  return {type: VERIFY_TOKEN, token: token}
}


export function startLoading(){
  return { type: START_LOADING }
}

export function updateLoading(value){
  return { type: UPDATE_LOADING, value }
}

export function stopLoading(){
  return { type: STOP_LOADING }
}

export function newAlert(settings){
  return { type: ALERT, ...settings }
}

export function addAlert(id){
  return { type: ADD_ALERT, id: id }
}

export function closeAlert(id){
  return { type: REMOVE_ALERT, id: id }
}
