import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchAllPastEvents, fetchSinglePastEvent } from '../../actions/events';
import '../css/event-lists.css';
import { Link } from 'react-router-dom';


export class PastEvents extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllPastEvents());
  }

  formatDate(date) {
    const newDate = new Date(date);
    return newDate.toDateString().split(' ').slice(1).join(' ');
  }

  formatTime(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
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
        // onClick={() => this.props.dispatch(fetchSinglePastEvent(event.id))}
        >
          {event.eventName} on {this.formatDate(event.date)} at {this.formatTime(event.time)}
        </Link>
      </li >
    ));

    return (
      <ul className="past-events" id="past-events">
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
    past: state.event.past
  };
};

export default requiresLogin()(connect(mapStateToProps)(PastEvents));