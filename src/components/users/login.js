import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RegisterForm from './registration-form';
import LoginForm from './login-form';

export function LogIn(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home">
      <RegisterForm />
      <h3>Or</h3>
      <LoginForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LogIn);
