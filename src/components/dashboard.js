import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import './css/dashboard.css';
import { Link } from 'react-router-dom';
import { toggleOnboard } from '../actions/auth';

export class Dashboard extends React.Component {

  render() {
    if (this.props.displayOnboard) {
      return (
        <div className="onboard">
          <p>Onboarding to go here</p>
          <button
            type='button'
            onClick={() => this.props.dispatch(toggleOnboard())}
          >Hide
          </button>
        </div>
      );
    } else {
      return (
        <div className="dashboard">
          <Link className="dash-item" to='/events/upcoming' >Upcoming Events</Link>
          <Link className="dash-item" to='/events/past' >Past Events</Link>
          <Link className="dash-item" to='/events/create-event' >Create New Event</Link>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  // const { authToken } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: state.auth.currentUser.fullName,
    displayOnboard: state.auth.displayOnboard
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
