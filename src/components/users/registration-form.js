import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import Input from '../input';
import '../css/form.css';
import { required, nonEmpty, matches, length, isTrimmed } from '../../validators';
const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, fullName } = values;
    const user = { username, password, fullName };
    user.username = user.username.toLowerCase();
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <div className="registration-home">
        <form
          className="registration-form"
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
          )}>

          <Field component={Input}
            label="Full Name"
            type="text"
            name="fullName"
            autocomplete="name"
            validate={[required, nonEmpty, isTrimmed]} />
          <Field
            label="Username"
            component={Input}
            type="text"
            name="username"
            autocomplete="username"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <Field
            label="Password"
            component={Input}
            type="password"
            name="password"
            autocomplete="new-password"
            validate={[required, passwordLength, isTrimmed]}
          />
          <Field
            label="passwordConfirm"
            component={Input}
            type="password"
            name="passwordConfirm"
            autocomplete="new-password"
            validate={[required, nonEmpty, matchesPassword]}
          />
          <button
            type="submit"
            disabled={this.props.pristine || this.props.submitting}>
            Signup
          </button>
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
