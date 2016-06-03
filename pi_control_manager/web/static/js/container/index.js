import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {LoginCard} from '../components/login'

//import {create_sAlert} from '../sagas'

import Alert from 'react-s-alert';

import {userLogin, newAlert } from '../actions'

const mapStateToProps = (state) => ({
  session: state.session,
  alerts: state.alerts
});


class App extends React.Component {

  clickLogin(e){
    const { dispatch, session } = this.props
    let username = document.getElementById("username-field");
    let password = document.getElementById("password-field");
    if(username.value.length < 2 || password.value.length < 6 ){
      dispatch(newAlert({msg: "Invalid Login", alert: "warning"}));
      username.value = "";
      password.value = "";
    } else {
      dispatch(userLogin(username.value, password.value))
      console.log({user: username.value, password: password.value});
      username.value = "";
      password.value = "";
    }
  }

  render(){

    const { children, dispatch } = this.props

return (
 <MuiThemeProvider muiTheme={getMuiTheme()}>
<div>
<AppBar
    title="PiControl"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
<div className="ui stackable grid container">
<div className="centered row">
      <LoginCard clickLogin={this.clickLogin.bind(this)}/>
</div>
  <div className="three column centered row">
    <div className="column"></div>
    <div className="column">
      {children}
    </div>
    <div className="column"></div>
  </div>
  </div>

   <Alert stack={{limit: 3}}
          position='bottom-right'
          timeout='none'
          effect='stackslide'/>
</div>
  </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps)(App);
