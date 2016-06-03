import axios from 'axios'


export const Api = {
  userLogin: function(username,password){
     return axios.post("/login", {user: username, pass: password})
  },
  userLogout: function(){
    return true
  }
}

export function checkToken(){
  return new Promise(function(resolve, reject){
    const token = localStorage.getItem('PiControlToken');
    if(!token){
      reject("No Token")
    } else {
      resolve(token)
    }
  })
}
