import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from '../utils/requires-login';

export class Onboarding extends React.Component {
  // If we are logged in redirect straight to the user's dashboard
  render() {
    return (
      <section className="onboarding" >
        <p>
          Hello and thank you for choosing to use Clowder! We hope you enjoy
          using our app as much as we enjoyed making it. This is a brief guide
          help you find your way around the site. If you think you've got things
          covered, feel free to skip the tutorial by clicking the 'Got it' Link
          at the bottom of the page. This info page can be found again in your
          userinfo. For those of you still reading, we'll try to keep this brief.
          <br /><br />
          Clowder's main funciton is to help you create and keep track of social events.
          On your Dashboard you'll find three links: Create Event, Upcoming Events, and Past Events.
          To get back to this main page at any time, click the Home button in the navigation bar at
          the top of the page.
          <br /><br />
          Now, let's create an Event! When you click on Create Event you will be asked to fill out a
          short form to provide the info for your event. You must include an Event Name, Date, Time, and
          Location for all events. There is also a description if you'd like to inlcude some addtional
          details (e.g. bring an appetizer to share) but you can also leave this blank if you'd like.
          <br /><br />
          Once you create an event you will be redirected to that event's main page which includes all
          the info you provided as well as a unique shareable link, something like this:<br />
          <a target="_blank" rel="noopener noreferrer"
            href="https://clowderv1.herokuapp.com/invites/5c66ef7d0d673f0017c11e4a">
            https://clowderv1.herokuapp.com/invites/5c66ef7d0d673f0017c11e4a</a>.<br /><br />
          This is your link to share with anyone you want to see the details of the event. They will
          not however, be able to edit any details or delete this event or see any of your personal info
          from this public URL.
          <br />
          Lastly, on your event pages you can edit the info of an event or delete it peramently using the
          buttons at the bottom of the page.
          <br /><br />
          Back to your main dashboard. The other links on this page (Upcoming and Past Events) Direct you
          to lists of all the events you've ever made. Once the date of an event has come and gone, it will
          automatically be switched from the Upcoming list to the Past list.
          <br /><br />
          The last bit of info we want to make sure you're aware of is your user info. If at any point
          you want to change any of your info (username, password or heck even your name, Mr. McLovin ;)
          you can do it by clicking on your username in the upperleft of the nav bar at the top of the page.
        </p>
        <br />
        <Link className="gotit" to="/dashboard" >Got it!</Link>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default requiresLogin()(connect(mapStateToProps)(Onboarding));