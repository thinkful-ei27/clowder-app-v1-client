import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import RegisterForm from './registration-form';

export function SignUp(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login">
      <h2>Sign Up</h2>
      <RegisterForm />
      <Link className="login-from-signup" to="/login" ><button>Log In Page</button></Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(SignUp);
