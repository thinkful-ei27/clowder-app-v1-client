import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { refreshAuthToken } from '../actions/auth';
import CreateEvent from './events/create-event';
import NavBar from './elements/navbar';
import LogIn from './users/login';
import SignUp from './users/signup';
import Dashboard from './elements/dashboard';
import EditUserSettings from './users/edit-user-settings';
import UpcomingEvents from './events/upcoming';
import PastEvents from './events/past';
import CurrentEvent from './events/current';
import Invite from './events/invite';
import LandingPage from './elements/landing-page';
import Onboarding from './elements/onboarding';
// import Header from './elements/header';
import '../css/app.css';

export class App extends React.Component {

  componentDidMount() {
    this.props.hideLoader();
  }
  componentWillUpdate() {
    this.props.showLoader();
  }
  componentDidUpdate(prevProps) {
    this.props.hideLoader();
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }
  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }
  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        {/*<Header className="header" role="banner" />*/}
        <NavBar className="navbar" role="navigation" />
        <div className="main">
          <Route className="landing-page" exact path="/" component={LandingPage} />
          <Route className="login" exact path="/login" component={LogIn} />
          <Route className="signup" exact path="/signup" component={SignUp} />
          <Route className="dashboard" exact path="/dashboard" component={Dashboard} />
          <Route className="editUser" exact path="/edit-user-settings/:id" component={EditUserSettings} />
          <Route className="create-event" exact path="/events/create-event" component={CreateEvent} />
          <Route className="upcoming-events" exact path="/events/upcoming" component={UpcomingEvents} />
          <Route className="past-events" exact path="/events/past" component={PastEvents} />
          <Route className="current-upcoming-event" exact path="/events/upcoming/:id" component={CurrentEvent} />
          <Route className="current-past-event" exact path="/events/past/:id" component={CurrentEvent} />
          <Route className="invite" exact path="/invites/:id" component={Invite} />
          <Route className="onboarding" exact path="/onboarding" component={Onboarding} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
