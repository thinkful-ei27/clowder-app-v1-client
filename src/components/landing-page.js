import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

export class LandingPage extends React.Component {
  // If we are logged in redirect straight to the user's dashboard
  componentWillMount() {
    this.visited = localStorage.getItem('alreadyVisited');
  }

  componentDidMount() {
    localStorage.setItem('alreadyVisited', true);
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    } else if (this.visited) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="home" >
          <p>
            Welcome to Clowder! Your one stop shop for creating, planning and sharing events.
            Corralling friends and family can sometimes feel like herding
            cats, this site can help turn that chore into a breeze! <br /><br />
            This site is designed to help you create and track events
            without the fuss and muss that other websites clutter your planning with.
            (I'm looking at you facebook notification and endless evite emails!)
            Simplify your plans with Clowder.
            <br /><br />
            Signup by clicking below to give it a try!
          </p>
          <Link to="/login" >Signup or Login</Link>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
