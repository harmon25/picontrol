import React            from 'react';
import { connect }      from 'react-redux';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Alert from 'react-s-alert'

class AuthenticatedContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log("AuthenticatedContainer")
  }

  render() {
    const { user, dispatch, children } = this.props;

    //if (!user) return false;

    return (
      <div id="authentication_container" className="application-container">
      <AppBar
          title="PiControl"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div className="ui stackable grid container">
          <div className="centered row">
            <div className="eight wide column">
                  {children}
            </div>
          </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.session.username,
});

export default connect(mapStateToProps)(AuthenticatedContainer);
