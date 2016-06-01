import axios from 'axios'


export const Api = {
  userLogin: function(username,password){
     return axios.post("/login", {user: username, pass: password})
  },
  userLogout: function(){
    return true
  }
}
