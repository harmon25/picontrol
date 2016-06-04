import axios from 'axios'
import * as actions from '../actions'
import {dispatch} from '../store'

function progressEvent (e){
   const percent_complete = (e.loaded / e.total) * 100;
   dispatch({type:'UPDATE_LOADING', percent_complete })
}

export const Api = {
  userLogin: function(username,password){
     return axios.post("/login", {user: username, pass: password}, {progress: progressEvent})
  },
  userLogout: function(){
    return true
  },
  verifyToken: function(axiosWheader){
    return axiosWheader.get('/api/user')
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


export function createAxiosInstance(token){
  return axios.create({
    headers: {'Authorization': token},
    timeout: 1000,
    progress: progressEvent
  })
}
