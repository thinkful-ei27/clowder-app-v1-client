import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchUpcomingEvents, fetchEvents, fetchEvent, fetchSingleEvent } from '../../actions/events';
import '../css/event-lists.css';
import { Link } from 'react-router-dom';


export class UpcomingEvents extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUpcomingEvents())
      .then(fetchEvents());
  }

  EventsList(props) {
    const events = this.props.upcoming.map((event, index) => (
      <li key={index}>
        <Link
          className="li-event"
          to={{ pathname: `/events/upcoming/${event.id}` }}
          onClick={() => this.props.dispatch(fetchSingleEvent(event.id))}
        >
          {event.eventName}: {event.date} {event.time}
        </Link>
      </li >
    ));

    return (
      <ul className="upcoming-events" id="upcoming-events">
        {events}
      </ul>
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