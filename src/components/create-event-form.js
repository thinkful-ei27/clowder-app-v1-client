import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class CreateEvent extends React.Component {
  onSubmit(values) {
    const { username, password, fullName, email } = values;
    const user = { username, password, fullName, email };
    // CHANGE THESE TO POSTING AN EVENT AND RETURNING IT AND MOUNT THOSE ACTIONS ABOVE
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <div className="create-event-home">
        <h2>Create an Event</h2>
        <form
          className="create-event-form"
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
          )}>
          <label htmlFor="LABEL">LABEL</label>
          <Field component={Input}
            type="text"
            name="NAME"
            validate={[required, nonEmpty, isTrimmed]} />
          <button
            type="submit"
            disabled={this.props.pristine || this.props.submitting}>
            Create
          </button>
          {/*create a cancel button*/}
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
