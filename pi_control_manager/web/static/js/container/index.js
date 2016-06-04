import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Alert from 'react-s-alert';


import {userLogin, newAlert } from '../actions'

import ProgressBar from 'react-progress-bar-plus';

const mapStateToProps = (state) => ({
  loadingBar: state.loadingBar
});


class App extends React.Component {
  render(){
        console.log("Container")
     const {children, loadingBar} = this.props

     return (
 <MuiThemeProvider muiTheme={getMuiTheme()}>
<div>
     <ProgressBar spinner={false} percent={loadingBar.percent}/>

    {children}
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
