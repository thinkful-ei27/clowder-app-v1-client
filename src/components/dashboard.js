import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import './css/dashboard.css';
import { Link } from 'react-router-dom';

export class Dashboard extends React.Component {

  render() {
    return (
      <div className="dashboard">
        <Link className="dash-item" to='/events/upcoming' >Upcoming Events</Link>
        <Link className="dash-item" to='/events/past' >Past Events</Link>
        <Link className="dash-item" to='/events/create-event' >Create New Event</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // const { authToken } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: state.auth.currentUser.fullName,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
