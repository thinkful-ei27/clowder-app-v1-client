import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Input from '../utils/input';
import Date from '../utils/date';
import Textarea from '../utils/textarea';
import { createEvent } from '../../actions/events';
import requiresLogin from '../utils/requires-login';
import { required, nonEmpty, isTrimmed, date, time } from '../utils/validators'; // ++ length
import '../../css/form.css';

const upcoming = document.querySelector('#accordion__title-2');
const past = document.querySelector('#accordion__title-3');

export class CreateEventForm extends React.Component {

  // componentDidMount() {
  //   document.querySelector(".date").valueAsDate = new Date();
  // }

  onSubmit(values) {
    //TODO Add viewingCode security for shareable links
    const { eventName, date, time, location, description } = values; // ++ viwingCode
    const dateAndTime = moment(date).add({ hours: time.slice(0, 2), minutes: values.time.slice(3, 5) }).format();
    const event = { eventName, dateAndTime, location, description }; // ++ viwingCode
    const currentDate = moment().format();
    const today = new Date().toISOString().substr(0, 10)
    console.log(today)
    
    if (dateAndTime > currentDate) {
      return this.props
        .dispatch(createEvent(event))
        // TODO return eventID in createEvent and go there
        .then(() => this.props.history.push('/dashboard'))
        .then(() => {
          const upcoming = document.querySelector('.upcoming')
          return upcoming.setAttribute("expanded", "")});
    } else if (dateAndTime < currentDate) {
      return this.props
        .dispatch(createEvent(event))
        .then(() => this.props.history.push('/dashboard'))
        .then(() => {
          const past = document.querySelector('.past')
          return past.setAttribute("expanded", "")});
    }
  }
  render() {
    return (
      <div className="create-event">
        <h2>Create an Event</h2>
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
          <Field component={Date}
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

          {/*<label htmlFor="viewingCode">Viewing Code optional</label>
          <Field component={Input}
            defaultValue=''
            type="text"
            name="viewingCode"
            validate={[viewingCodeLength, isTrimmed]}
          />*/}

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
            <button type="button" className="cancel" onClick={() => this.props.history.push('/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default requiresLogin()(withRouter(reduxForm({

  form: 'create-event',
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('create-event', Object.keys(errors)[0]))
})(CreateEventForm)));
