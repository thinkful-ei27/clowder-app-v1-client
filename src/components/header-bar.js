import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { Link } from 'react-router-dom';
import { stat } from 'fs';
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
        <a class="nav-item" onClick={() => this.logOut()}>log out</a>
      );
      userSettings = (
        <Link class="nav-item" to="/edit-user-settings">{this.props.currentUser.username}</Link>
      );
    }
    return (
      <div class="header-bar" className="header-bar">
        {userSettings}
        <Link class="nav-item" to="/dashboard">Clowder</Link>
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
