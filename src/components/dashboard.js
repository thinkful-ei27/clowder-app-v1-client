import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';
import './css/dashboard.css';
import { Link } from 'react-router-dom';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    return (
      <div className="dashboard">
        <Link class="dash-item" to='/upcoming-events' >Upcoming Events</Link>
        <Link class="dash-item" to='/past-events' >Past Event</Link>
        <Link class="dash-item" to='/create-event-form' >Create New Event</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: state.auth.currentUser.fullName,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
