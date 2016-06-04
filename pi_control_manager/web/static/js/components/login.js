import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {userLogin, newAlert } from '../actions'

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  session: state.session
});

class LoginCard extends React.Component {

  userLoginClick(e){
    const { dispatch } = this.props;
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
    console.log("UMM HI I am login?")
    return (
      <div className="ui stackable grid container">
      <div className="centered row">
        <div className="eight wide column">
      <Card style={{WebkitMarginBefore: "2em"}}>
        <CardText>
          <h3 style={{WebkitMarginAfter: "0.25em"}} className="ui center aligned dividing header">Please Login</h3>
        <TextField
        id="username-field"
        style={{width: "100%"}}
          floatingLabelText="Username"
        /><br />
        <TextField
          id="password-field"
          style={{width: "100%"}}
          floatingLabelText="Password"
          type="password"
        />
        </CardText>
        <CardActions>
          <RaisedButton onTouchTap={this.userLoginClick.bind(this)} label="Login" />
        </CardActions>
      </Card>
      </div>
      </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(LoginCard)
