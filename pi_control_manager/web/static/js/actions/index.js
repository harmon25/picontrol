export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const LOGIN_OK = 'LOGIN_OK';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const CLEAR_ALERT = 'CLEAR_ALERT';



export function userLogin(username,password){
  return {
    type: USER_LOGIN,
    user: username,
    pass: password
  }
}
