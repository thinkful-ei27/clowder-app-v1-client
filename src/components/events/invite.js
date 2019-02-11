import React from 'react';
import { connect } from 'react-redux';
import {
  fetchSingleInvite
} from '../../actions/events';
import { Link } from 'react-router-dom';

export class Invite extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchSingleInvite(id));
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

  EventDetails(props) {
    const event = props.currentEvent;
    if (!event) {
      return <div>loading</div>;
    } if (event) {
      const date = new Date(event.date);
      const prettyDate = date.toDateString();
      return (
        <div className='single-event-home'>
          <div className='event-info'>
            <h3>{event.eventName}</h3>
            <h4>Date:</h4> {prettyDate}
            <h4>Time:</h4> {this.formatTime(event.time)}
            <h4>Location:</h4> {event.location}
            <h4>Description:</h4> {event.description}
          </div>
          <Link to={'/dashboard'}>Make a Clowder Account!</Link>
        </div>
      );
    }
  }

  render() {
    return (
      this.EventDetails(this.props)
    );
  }
}



const mapStateToProps = state => {

  return {
    currentEvent: state.event.currentEvent,
  };
};

export default connect(mapStateToProps)(Invite);