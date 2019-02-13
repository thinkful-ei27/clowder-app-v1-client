import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from '../input';
import { login } from '../../actions/auth';
import { required, nonEmpty } from '../../validators';
import './../css/form.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
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
          <label htmlFor="username">Username</label>
          <Field
            component={Input}
            type="text"
            name="username"
            id="username"
            autocomplete="username"
            validate={[required, nonEmpty]}
          />
          <label htmlFor="password">Password</label>
          <Field
            component={Input}
            type="password"
            name="password"
            id="password"
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
