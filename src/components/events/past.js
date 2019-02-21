import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../utils/requires-login';
import { fetchAllPastEvents } from '../../actions/events';
import '../../css/event-lists.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class PastEvents extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllPastEvents());
  }

  formatDate(dateAndTime) {
    return moment(dateAndTime).format('ddd MMMM Do YYYY');
  }

  formatTime(dateAndTime) {
    return moment(dateAndTime).format('hh:mm A');
  }

  EventsList(props) {

    const events = this.props.past.map((event, index) => (
      <li key={index}>
        <Link
          className="li-event"
          to={{
            pathname: `/events/past/${event.id}`,
            state: { fromWhere: 'past' }
          }}
        >
          » {event.eventName} on {this.formatDate(event.dateAndTime)} at {this.formatTime(event.dateAndTime)}
        </Link>
      </li >
    ));

    return (
      <div className="past-events-home">
        <h2 className="list-title">Past Events</h2>
        <ul className="past-events" id="past-events">
          {events}
        </ul>
      </div>
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
    past: state.event.past
  };
};

export default requiresLogin()(connect(mapStateToProps)(PastEvents));