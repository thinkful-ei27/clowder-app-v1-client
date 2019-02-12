import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home">
      <p>
        Welcome to Clowder! Your one stop shop for creating, planning and sharing events.<br /><br />
        You can use this app to create an account and keep track of all the events you want to share with friends
        without the fuss or muss of other websites that clutter your planning with unwanted email notifications,
        advertising, or endless unrelevant debates in comments sections. <br /><br />
        Signup by clicking below to give it a try!
      </p>
      <Link to="/login" >Signup or Login</Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
