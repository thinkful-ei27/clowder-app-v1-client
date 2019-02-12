import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { Link } from 'react-router-dom';
import './css/header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutLink;
    let userSettings;
    if (this.props.loggedIn) {
      logOutLink = (
        <a className="nav-item" onClick={() => this.logOut()}>log out</a>
      );
      userSettings = (
        <Link className="nav-item" to="/edit-user-settings">{this.props.currentUser.username}</Link>
      );
    }
    return (
      <div className="header-bar">
        {userSettings}
        <Link className="nav-item" to="/dashboard">Home</Link>
        {logOutLink}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(HeaderBar);
