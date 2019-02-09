import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import requiresLogin from '../requires-login';
import Input from '../input';
import Textarea from '../textarea';
import { updateSingleUpcomingEvent, updateSinglePastEvent, toggleEditing } from '../../actions/events';
import '../css/form.css';
import { required, nonEmpty, isTrimmed, length, date, time } from '../../validators';
const viewingCodeLength = length({ min: 8, max: 72 });


export class EditEventForm extends React.Component {

  // onComponentWillMount() {
  //   this.props.initialize({
  //     eventName: this.props.currentEvent.eventName,
  //     date: this.props.currentEvent.date,
  //     time: this.props.currentEvent.time,
  //     viewingCode: this.props.currentEvent.viewingCode,
  //     location: this.props.currentEvent.location,
  //     description: this.props.currentEvent.description
  //   }
  //   );
  // }

  onSubmit(values) {
    const { eventName, date, time, viewingCode, location, description } = values;
    const event = { eventName, date, time, viewingCode, location, description };
    const eventDate = new Date(event.date);
    const { id } = this.props.params;
    if (eventDate > new Date()) {
      return this.props
        .dispatch(updateSingleUpcomingEvent(id, event))
        .then(() => this.props.toggleEditing());
    } else if (eventDate < new Date()) {
      return this.props
        .dispatch(updateSinglePastEvent(id, event))
        .then(() => this.props.toggleEditing());
    }
  }

  render() {
    return (
      <div className="edit-event-home">
        <h3>edit an Event</h3>
        <form
          className="edit-event-form"
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values))}>
          <label htmlFor="eventName">Event Name</label>
          <Field component={Input}
            type="text"
            name="eventName"
            validate={[required, nonEmpty, isTrimmed]}
          />

          <label htmlFor="date">Date</label>
          <Field component={Input}
            type="date"
            name="date"
            validate={[date]}
          />

          <label htmlFor="time">Time</label>
          <Field component={Input}
            type="time"
            name="time"
            validate={[required, nonEmpty, time]}
          />

          <label htmlFor="location">Location</label>
          <Field component={Input}
            type="text"
            name="location"
            validate={[required, nonEmpty, isTrimmed]}
          />

          <label htmlFor="viewingCode">Viewing Code optional</label>
          <Field component={Input}
            defaultValue=''
            type="text"
            name="viewingCode"
            validate={[viewingCodeLength, isTrimmed]}
          />

          <label htmlFor="description">Description (optional)</label>
          <Field component={Textarea}
            type="text"
            name="description" />

          <div className="buttons">
            <button
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              edit
            </button>
            <Link className="link" to="/dashboard">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  let idx = state.event.currentEvent,
    event = idx !== null ? state.event.currentEvent[idx] : null;

  return {
    username: state.auth.currentUser.username,
    name: state.auth.currentUser.fullName,
    currentEvent: state.event.currentEvent,
    isEditing: state.event.isEditing,
    event,
    initalValues: event
  };
};

const connectedReduxFrom = reduxForm({
  form: 'edit-event',
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('edit-event', Object.keys(errors)[0]))
})(EditEventForm);

export default requiresLogin()(connect(mapStateToProps)(withRouter(connectedReduxFrom)));
