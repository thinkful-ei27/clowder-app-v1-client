import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import requiresLogin from '../requires-login';
import Input from '../input';
import Textarea from '../textarea';
import { updateSingleUpcomingEvent, updateSinglePastEvent, toggleEditing } from '../../actions/events';
import '../css/form.css';
import { required, nonEmpty, isTrimmed, date, time } from '../../validators'; // ++ length
// const viewingCodeLength = length({ min: 8, max: 72 });

function onSubmit(values, dispatch, formProps) {
  const { eventName, date, time, viewingCode, location, description } = values;
  const event = { eventName, date, time, viewingCode, location, description };
  const eventDate = new Date(event.date);
  const { id } = formProps.match.params;
  let now = Date.now();
  if (eventDate > now) {
    return dispatch(updateSingleUpcomingEvent(id, event))
      .then(() => toggleEditing());
  } else if (eventDate < now) {
    return dispatch(updateSinglePastEvent(id, event))
      .then(() => toggleEditing());
  }
}
export class EditEventForm extends React.Component {


  render() {
    return (
      <div className="edit-event-home">
        <h3>edit an Event</h3>
        <form
          className="edit-event-form"
          onSubmit={this.props.handleSubmit}>
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
              edit
            </button>
            <button
              type='button'
              onClick={() => this.props.dispatch(toggleEditing())}
            >Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    name: state.auth.currentUser.fullName,
    currentEvent: state.event.currentEvent,
    isEditing: state.event.isEditing,
    initialValues: Object.assign({}, state.event.currentEvent, {
      date: new Date(state.event.currentEvent.date).toISOString()
    })
  };
};

const connectedReduxFrom = reduxForm({
  onSubmit,
  form: 'edit-event',
  enableReinitialize: true,
  onSubmitFail: (errors, dispatch) => {
    return dispatch(focus('edit-event', Object.keys(errors)[0]));
  }
})(EditEventForm);

export default requiresLogin()(connect(mapStateToProps)(withRouter(connectedReduxFrom)));
