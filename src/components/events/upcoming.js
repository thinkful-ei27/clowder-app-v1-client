import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../utils/requires-login';
import { fetchAllUpcomingEvents } from '../../actions/events';
import '../../css/event-lists.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class UpcomingEvents extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllUpcomingEvents());
  }

  formatDate(dateAndTime) {
    return moment(dateAndTime).format('ddd MMMM Do YYYY');
  }

  formatTime(dateAndTime) {
    return moment(dateAndTime).format('hh:mm A');
  }

  EventsList(props) {
    const events = this.props.upcoming.map((event, index) => (
      <li key={index}>
        <Link
          className="li-event"
          to={{
            pathname: `/events/upcoming/${event.id}`,
            state: { fromWhere: 'upcoming' }
          }}
        >
          » {event.eventName} on {this.formatDate(event.dateAndTime)} at {this.formatTime(event.dateAndTime)}
        </Link>
      </li >
    ));

    return (
      <section className="upcoming-events-home">
        <ul className="upcoming-events" id="upcoming-events">
          {events}
        </ul>
      </section>
    );
  }

  render() {
    return (
      this.EventsList(this.props)
    );
  }
}

const mapStateToProps = state => {

  return {
    username: state.auth.currentUser.username,
    name: state.auth.currentUser.fullName,
    upcoming: state.event.upcoming
  };
};

export default requiresLogin()(connect(mapStateToProps)(UpcomingEvents));