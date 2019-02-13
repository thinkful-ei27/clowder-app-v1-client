import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from '../requires-login';
import {
  fetchSingleUpcomingEvent,
  fetchSinglePastEvent,
  deleteSinglePastEvent,
  deleteSingleUpcomingEvent,
  updateSingleUpcomingEvent,
  updateSinglePastEvent,
  toggleEditing
} from '../../actions/events';
import EditEventForm from './edit-event-form';
import '../css/event-info.css';

export class CurrentEvent extends React.Component {


  // TODO CHANGE FROMWHERE TO CHECK CURRENT URL????????????????????


  componentDidMount() {
    const { id } = this.props.match.params;
    const { fromWhere } = this.props.location.state;
    if (fromWhere === 'upcoming') {
      this.props.dispatch(fetchSingleUpcomingEvent(id));
    } else if (fromWhere === 'past') {
      this.props.dispatch(fetchSinglePastEvent(id));
    }
  }
  onClickDelete() {
    const { id } = this.props.match.params;
    const { fromWhere } = this.props.location.state;
    if (fromWhere === 'upcoming') {
      return this.props.dispatch(deleteSingleUpcomingEvent(id))
        .then(() => this.props.history.push('/events/upcoming'));
    } else if (fromWhere === 'past') {
      return this.props.dispatch(deleteSinglePastEvent(id))
        .then(() => this.props.history.push('/events/past'));
    }
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
  // THIS IS THE SUBMIT CALLBACK ONSUBMIT FOR THE SUBMIT EDIT EVENT
  // (id, event) => this.editEventInfo(id, event)
  editEventInfoSubmit() {
    const { id } = this.props.match.params;
    const { fromWhere } = this.props.location.state;
    const event = {};
    if (fromWhere === 'upcoming') {
      return this.props.dispatch(updateSingleUpcomingEvent(id, event))
        .then(() => this.props.history.push('/events/upcoming/{id}' /* CHANGE THIS TO REFRESH?*/));
    } else if (fromWhere === 'past') {
      return this.props.dispatch(updateSinglePastEvent(id, event))
        .then(() => this.props.history.push('/events/past/' /* CHANGE THIS TO REFRESH?*/));
    }
  }
  toggleEditing() {
    return this.props.dispatch(toggleEditing());
  }

  EventDetails(props) {
    const event = props.currentEvent;
    if (!event) {
      return <div>loading</div>;
    } if (event) {
      const date = new Date(event.date);
      const prettyDate = date.toDateString();
      if (!this.props.isEditing) {
        return (
          <div className='single-event-home'>
            <div className='event-info'>
              <h3>{event.eventName}</h3>
              <h4>Date:</h4> <p>{prettyDate}</p>
              <h4>Time:</h4> <p>{this.formatTime(event.time)}</p>
              <h4>Location:</h4> <p>{event.location}</p>
              <h4>Description:</h4> <p>{event.description}</p>
              <h4>Shareable Link:</h4> <Link to={`/invites/${event.id}`}>{window.location.origin}/invites/{event.id}</Link>
            </div>
            <div className="buttons">
              <button
                type='button'
                onClick={id => this.onClickDelete(id)}
              >Delete Event
              </button>
              <button
                type='button'
                onClick={() => this.toggleEditing()}
              >Edit Event
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <EditEventForm />
        );
      }
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
    username: state.auth.currentUser.username,
    name: state.auth.currentUser.fullName,
    currentEvent: state.event.currentEvent,
    isEditing: state.event.isEditing,

  };
};

export default requiresLogin()(connect(mapStateToProps)(CurrentEvent));