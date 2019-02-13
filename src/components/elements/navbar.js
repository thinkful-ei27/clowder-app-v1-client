import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../../actions/auth';
import { clearEvents } from '../../actions/events';
import { clearAuthToken } from '../../actions/local-storage';
import { Link } from 'react-router-dom';
import '../../css/navbar.css';

export class NavBar extends React.Component {
  logOut() {
    this.props.dispatch(clearEvents());
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutLink;
    let userSettings;
    if (this.props.loggedIn) {
      logOutLink = (
        <a className="nav-item" onClick={() => this.logOut()}>Log Out</a>
      );
      userSettings = (
        <Link className="nav-item" to={`/edit-user-settings/${this.props.currentUser.userId}`}>{this.props.currentUser.username}</Link>
      );
    }
    return (
      <div className="navbar">
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

export default connect(mapStateToProps)(NavBar);
