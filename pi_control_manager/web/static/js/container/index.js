import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {LoginCard} from '../components/login'

const mapStateToProps = (state) => ({
  session: state.session
});


class App extends React.Component {

  render(){

    const { children } = this.props

return (
 <MuiThemeProvider muiTheme={getMuiTheme()}>
<div>
<AppBar
    title="PiControl"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
<div className="ui stackable grid container">
<div className="centered row">
  <div className="six wide column">
      <LoginCard />
  </div>
</div>
  <div className="three column centered row">
    <div className="column"></div>
    <div className="column">
      {children}
    </div>
    <div className="column"></div>
  </div>
  </div>
</div>
  </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps)(App);
