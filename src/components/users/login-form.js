import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from '../utils/input';
import { login } from '../../actions/auth';
import { required, nonEmpty } from '../utils/validators';
import '../../css/form.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values['login-username'], values['login-password']));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <div className="login-home">
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
          )}>
          {error}
          <label htmlFor="login-username">Username</label>
          <Field
            component={Input}
            type="text"
            name="login-username"
            id="login-username"
            autocomplete="username"
            validate={[required, nonEmpty]}
          />
          <label htmlFor="login-password">Password</label>
          <Field
            component={Input}
            type="password"
            name="login-password"
            id="login-password"
            autocomplete="current-password"
            validate={[required, nonEmpty]}
          />
          <button disabled={this.props.pristine || this.props.submitting}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
