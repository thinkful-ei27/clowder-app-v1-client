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
  toggleEditing,
  toggleDeleting
} from '../../actions/events';
import EditEventForm from './edit-event-form';
import '../../css/event-info.css';
import moment from 'moment';


const loader = document.querySelector('.loader');

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

  toggleDeleteConfirm() {
    return this.props.dispatch(toggleDeleting());
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

  showLoader = () => loader.classList.remove('loader--hide');
  hideLoader = () => loader.classList.add('loader--hide');

  EventDetails(props) {
    const event = props.currentEvent;
    if (!event) {
      return () => this.props.showLoader();
    } else if (event && this.props.confirmDelete) {
      return (
        <section className="confirm-delete">
          <h3>Are you sure you want to delete this event?</h3>
          <div className="buttons">
            <button
              className="delete-it"
              type='button'
              onClick={id => this.onClickDelete(id)}
            >Delete It
            </button>
            <button
              className="keep-it"
              type='button'
              onClick={() => this.toggleDeleteConfirm()}
            >Keep It
            </button>
          </div>
        </section>
      );
    } else if (event && event.description && !this.props.isEditing) {
      const prettyDate = moment(event.dateAndTime).format('ddd MMMM Do YYYY');
      const prettyTime = moment(event.dateAndTime).format('hh:mm a');

      return (
        <section className='single-event-home'>
          <div className='event-info'>
            <h2 className="event-name">{event.eventName}</h2>
            <h3 className="info-category">Date:</h3> <p>{prettyDate}</p>
            <h3 className="info-category">Time:</h3> <p>{prettyTime}</p>
            <h3 className="info-category">Location:</h3> <p>{event.location}</p>
            <h3 className="info-category">Description:</h3> <p>{event.description}</p>
            <h3 className="info-category">Shareable Link:</h3> <Link to={`/invites/${event.id}`}>{window.location.origin}/invites/{event.id}</Link>
            <div className="buttons">
              <button className="delete-it"
                type='button'
                onClick={() => this.toggleDeleteConfirm()}
              >Delete Event
              </button>
              <button
                type='button'
                onClick={() => this.toggleEditing()}
              >Edit Event
              </button>
            </div>
          </div>

        </section>
      );
    } else if (event && !event.description && !this.props.isEditing) {
      const prettyDate = moment(event.dateAndTime).format('ddd MMMM Do YYYY');
      const prettyTime = moment(event.dateAndTime).format('hh:mm a');

      return (
        <section className='single-event-home'>
          <div className='event-info'>
            <h2 className="event-name">{event.eventName}</h2>
            <h3 className="info-category">Date:</h3> <p>{prettyDate}</p>
            <h3 className="info-category">Time:</h3> <p>{prettyTime}</p>
            <h3 className="info-category">Location:</h3> <p>{event.location}</p>
            <h3 className="info-category">Shareable Link:</h3> <Link to={`/invites/${event.id}`}>{window.location.origin}/invites/{event.id}</Link>
            <div className="buttons">
              <button className="delete-it"
                type='button'
                onClick={() => this.toggleDeleteConfirm()}
              >Delete Event
              </button>
              <button
                type='button'
                onClick={() => this.toggleEditing()}
              >Edit Event
              </button>
            </div>
          </div>

        </section>
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
    confirmDelete: state.event.confirmDelete
  };
};

export default requiresLogin()(connect(mapStateToProps)(CurrentEvent));