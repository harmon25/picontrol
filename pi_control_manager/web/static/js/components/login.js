import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export const LoginCard = (props) => (
<div className="six wide column">
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
      <RaisedButton onTouchTap={props.clickLogin} label="Login" />
    </CardActions>
  </Card>
</div>
);
