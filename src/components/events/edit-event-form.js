import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import requiresLogin from '../utils/requires-login';
import Input from '../utils/input';
import Textarea from '../utils/textarea';
import moment from 'moment';
import { updateSingleUpcomingEvent, updateSinglePastEvent, toggleEditing } from '../../actions/events';
import { required, nonEmpty, isTrimmed, date, time } from '../utils/validators'; // ++ length
import '../../css/form.css';
// const viewingCodeLength = length({ min: 8, max: 72 });

function onSubmit(values, dispatch, formProps) {
  const { eventName, date, time, location, description } = values; // ++ viwingCode
  const dateAndTime = moment(date).add({ hours: time.slice(0, 2), minutes: values.time.slice(3, 5) }).format();
  const event = { eventName, dateAndTime, location, description }; // ++ viwingCode
  const currentDate = moment().format();
  const { id } = formProps.match.params;
  if (dateAndTime > currentDate) {
    return dispatch(updateSingleUpcomingEvent(id, event))
      .then(() => toggleEditing());
  } else if (dateAndTime < currentDate) {
    return dispatch(updateSinglePastEvent(id, event))
      .then(() => toggleEditing());
  }
}
export class EditEventForm extends React.Component {

  render() {
    return (
      <section className="edit-event-home">
        <h2>{this.props.currentEvent.eventName}</h2>
        <form
          className="edit-event-form"
          onSubmit={this.props.handleSubmit}>
          <Field component={Input}
            type="text"
            name="eventName"
            label="Event Name"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <Field component={Input}
            type="date"
            name="date"
            label="Date"
            validate={[date]}
          />
          <Field component={Input}
            type="time"
            name="time"
            label="Time"
            validate={[required, nonEmpty, time]}
          />
          <Field component={Input}
            type="text"
            name="location"
            label="Location"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <Field component={Textarea}
            label="Description"
            type="text"
            name="description" />

          <div className="buttons">
            <button
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Save
            </button>
            <button
              type='button' className="cancel"
              onClick={() => this.props.dispatch(toggleEditing())}
            >Cancel
            </button>
          </div>
        </form>
      </section>
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
      date: moment(state.event.currentEvent.dateAndTime).format('YYYY-MM-DD'),
      time: moment(state.event.currentEvent.dateAndTime).format('hh:mm'),

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
