import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../utils/requires-login';
import '../../css/dashboard.css';
import { Link, Redirect } from 'react-router-dom';

export class Dashboard extends React.Component {

  componentWillMount() {
    this.onboarded = localStorage.getItem('onboarded');
  }

  componentDidMount() {
    localStorage.setItem('onboarded', true);
  }

  render() {
    if (!this.onboarded) {
      return <Redirect to="/onboarding" />;
    } else {
      return (
        <div className="dashboard">
          <Link className="dash-item upcoming" to='/events/upcoming' >Upcoming Events</Link>
          <Link className="dash-item past" to='/events/past' >Past Events</Link>
          <Link className="dash-item create-event-link" to='/events/create-event' >Create New Event</Link>
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
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
