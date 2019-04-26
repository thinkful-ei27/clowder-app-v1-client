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
    let logOutOrInLink;
    let userSettings;
    if (this.props.loggedIn) {
      logOutOrInLink = (
        <button type="button" className="nav-item" onClick={() => this.logOut()}><span>Log Out</span></button>
      );
      userSettings = (
        <Link className="nav-item" to={`/edit-user-settings/${this.props.currentUser.userId}`}><span>{this.props.currentUser.username}</span></Link>
      );

      return (
        <nav className="navbar">
          {userSettings}
          <Link className="nav-item" to="/dashboard"><h1>Clowder</h1></Link>
          {logOutOrInLink}
        </nav>
      );
    } else {
      return (
        <nav className="navbar">
          <Link className="nav-item" to="/dashboard"><h1>Clowder</h1></Link>
        </nav>
      );
    }
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(NavBar);
