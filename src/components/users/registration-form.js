import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import Input from '../utils/input';
import { Link } from 'react-router-dom';
import '../../css/form.css';
import { required, nonEmpty, matches, length, isTrimmed } from '../utils/validators';
const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {


  onSubmit(values) {
    const { username, password, fullName } = values;
    const user = { username, password, fullName };
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
            placeholder="Full Name"
            type="text"
            name="fullName"
            autocomplete="name"
            validate={[required, nonEmpty, isTrimmed]} />
          <Field
            placeholder="Username"
            component={Input}
            type="text"
            name="username"
            autocomplete="username"
            validate={[required, nonEmpty, isTrimmed]}
          />
          <Field
            placeholder="Password"
            component={Input}
            type="password"
            name="password"
            autocomplete="new-password"
            validate={[required, passwordLength, isTrimmed]}
          />
          <Field
            placeholder="Confirm Password"
            component={Input}
            type="password"
            name="passwordConfirm"
            autocomplete="new-password"
            validate={[required, nonEmpty, matchesPassword]}
          />
          <div className="buttons">
            <button
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Signup
            </button>
            <Link className="login-from-signup" to="/login" ><button>Log In Page</button></Link>
          </div>
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
