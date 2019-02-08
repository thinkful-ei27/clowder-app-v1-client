import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import Input from '../input';
import Textarea from '../textarea';
import { createEvent } from '../../actions/events';
import '../css/form.css';
import { required, nonEmpty, isTrimmed, length, date, time } from '../../validators';
const viewingCodeLength = length({ min: 8, max: 72 });


export class CreateEventForm extends React.Component {

  onSubmit(values) {
    const { eventName, date, time, viewingCode, location, description } = values;
    const event = { eventName, date, time, viewingCode, location, description };
    const eventDate = new Date(event.date);
    console.log(eventDate);
    if (eventDate > new Date()) {
      return this.props
        .dispatch(createEvent(event))
        // TODO return eventID in createEvent and go there
        .then(() => this.props.history.push('/events/upcoming'));
    } else if (eventDate < new Date()) {
      return this.props
        .dispatch(createEvent(event))
        .then(() => this.props.history.push('/events/past'));
    }
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
              Create
            </button>
            <Link className="link" to="/dashboard">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(reduxForm({

  form: 'create-event',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('create-event', Object.keys(errors)[0]))
})(CreateEventForm));
