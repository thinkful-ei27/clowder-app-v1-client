import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import Input from '../input';
import Textarea from '../textarea';
import { createEvent } from '../../actions/events';
import '../css/form.css';
// import { required, nonEmpty, isTrimmed, viewingCode } from '../validators';
// const viewingCodeLength = viewingCode({ min: 8, max: 72 });

export class CreateEventForm extends React.Component {

  // CHANGE THESE TO POSTING AN EVENT AND RETURNING IT AND MOUNT THOSE ACTIONS ABOVE

  onSubmit(values) {
    const { eventName, date, time, viewingCode, location, description } = values;
    const event = { eventName, date, time, viewingCode, location, description };
    return this.props
      // TODO return eventID in createEvent
      .dispatch(createEvent(event))
    //.then((eventId) => this.props.history.push(`/events/${eventId}`));
  }

  render() {
    return (
      <div className="create-event-home">
        <h3>Create an Event</h3>
        <form
          className="create-event-form"
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values))}>
          <label htmlFor="eventName">Event Name</label>
          <Field component={Input}
            type="text"
            name="eventName"
            className="eventName"
            id="eventName"
          />

          <label htmlFor="eventDate">Date</label>
          <Field component={Input}
            type="text"
            name="date"
            className="date"
            id="date"
          />

          <label htmlFor="time">Time</label>
          <Field component={Input}
            type="text"
            name="time"
            className="time"
            id="time"
          />

          <label htmlFor="location">Location</label>
          <Field component={Input}
            type="text"
            name="location"
            className="location"
            id="location"
          />

          <label htmlFor="viewingCode">Viewing Code (optional)</label>
          <Field component={Input}
            type="text"
            name="viewingCode"
            className="viewingCode"
            id="viewingCode"
          />

          <label htmlFor="description">Description (optional)</label>
          <Field component={Textarea}
            type="text"
            name="description"
            className="description"
            id="description" />
          <div className="buttons">
            <button
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Create
            </button>
            <Link className="link" to="/dashboard">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'create-event',
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('create-event', Object.keys(errors)[0]))
})(CreateEventForm);
