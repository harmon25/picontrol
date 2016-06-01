import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export const LoginCard = () => (
  <Card style={{WebkitMarginBefore: "2em"}}>
    <CardText>
      <h3 style={{WebkitMarginAfter: "0.25em"}} className="ui center aligned dividing header">Please Login</h3>
    <TextField
    style={{width: "100%"}}
      hintText="picontrol"
      floatingLabelText="Username"
      floatingLabelFixed={true}
    /><br />
    <TextField
      style={{width: "100%"}}
      hintText="Password"
      floatingLabelText="Password"
      type="password"
    />
    </CardText>
    <CardActions>
      <RaisedButton label="Login" />
    </CardActions>
  </Card>
);
