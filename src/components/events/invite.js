import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  fetchSingleInvite
} from '../../actions/events';
import { Link } from 'react-router-dom';
import '../../css/event-info.css';

const loader = document.querySelector('.loader');

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

  showLoader = () => loader.classList.remove('loader--hide');
  hideLoader = () => loader.classList.add('loader--hide');

  EventDetails(props) {
    const event = props.currentEvent;
    if (!event) {
      return () => this.props.showLoader();
    }
    if (event && event.description) {
      const prettyDate = moment(event.dateAndTime).format('ddd MMMM Do YYYY');
      const prettyTime = moment(event.dateAndTime).format('hh:mm a');
      return (
        <section className='single-event-home'>
          <div className='event-info'>
            <h2 className="event-name">{event.eventName}</h2>
            <h3>Date:</h3> <p>{prettyDate}</p>
            <h3>Time:</h3> <p>{prettyTime}</p>
            <h3>Location:</h3> <p>{event.location}</p>
            <h3>Description:</h3> <p>{event.description}</p>
          </div>
          <Link to={'/dashboard'}>Make a Clowder Account!</Link>
        </section>
      );
    }
    if (event && !event.description) {
      const prettyDate = moment(event.dateAndTime).format('ddd MMMM Do YYYY');
      const prettyTime = moment(event.dateAndTime).format('hh:mm a');
      return (
        <section className='single-event-home'>
          <div className='event-info'>
            <h2>{event.eventName}</h2>
            <h3>Date:</h3> <p>{prettyDate}</p>
            <h3>Time:</h3> <p>{prettyTime}</p>
            <h3>Location:</h3> <p>{event.location}</p>
          </div>
          <Link to={'/dashboard'}>Make a Clowder Account!</Link>
        </section>
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