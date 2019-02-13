import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from '../utils/requires-login';
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
import '../../css/event-info.css';
import moment from 'moment';

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
    } if (event && event.description && !this.props.isEditing) {
      const prettyDate = moment(event.dateAndTime).format('ddd MMMM Do YYYY');
      const prettyTime = moment(event.dateAndTime).format('hh:mm a');

      return (
        <div className='single-event-home'>
          <div className='event-info'>
            <h2>{event.eventName}</h2>
            <h3>Date:</h3> <p>{prettyDate}</p>
            <h3>Time:</h3> <p>{prettyTime}</p>
            <h3>Location:</h3> <p>{event.location}</p>
            <h3>Description:</h3> <p>{event.description}</p>
            <h3>Shareable Link:</h3> <Link to={`/invites/${event.id}`}>{window.location.origin}/invites/{event.id}</Link>
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
    } else if (event && !event.description && !this.props.isEditing) {
      const prettyDate = moment(event.dateAndTime).format('ddd MMMM Do YYYY');
      const prettyTime = moment(event.dateAndTime).format('hh:mm a');

      return (
        <div className='single-event-home'>
          <div className='event-info'>
            <h2>{event.eventName}</h2>
            <h3>Date:</h3> <p>{prettyDate}</p>
            <h3>Time:</h3> <p>{prettyTime}</p>
            <h3>Location:</h3> <p>{event.location}</p>
            <h3>Shareable Link:</h3> <Link to={`/invites/${event.id}`}>{window.location.origin}/invites/{event.id}</Link>
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