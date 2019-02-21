import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from '../utils/input';
import { login } from '../../actions/auth';
import { Link } from 'react-router-dom';
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
          <Field
            component={Input}
            label="Username"
            type="text"
            name="login-username"
            id="login-username"
            autocomplete="username"
            validate={[required, nonEmpty]}
          />
          <Field
            label="Password"
            component={Input}
            type="password"
            name="login-password"
            id="login-password"
            autocomplete="current-password"
            validate={[required, nonEmpty]}
          />
          <div className="buttons">
            <button disabled={this.props.pristine || this.props.submitting}>
              Login
            </button>
            <Link className="signup-from-login" to="/signup" ><button>Sign Up page</button></Link>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
