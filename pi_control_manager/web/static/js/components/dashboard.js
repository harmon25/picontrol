import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {newAlert, userLogout } from '../actions'

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  session: state.session
});

class Dashboard extends React.Component {
  render(){
    const {dispatch} = this.props
      
    return (
      <Card style={{WebkitMarginBefore: "2em"}}>
        <CardText>
          <h3 style={{WebkitMarginAfter: "0.25em"}} className="ui center aligned dividing header"> Dashboard!</h3>
        </CardText>
        <CardActions>
          <RaisedButton onTouchTap={()=>{dispatch(userLogout())}} label="Logout" />
        </CardActions>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Dashboard)
