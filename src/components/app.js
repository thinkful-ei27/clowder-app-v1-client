import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import { refreshAuthToken } from '../actions/auth';
import './css/app.css';
import { CreateEvent } from './events/create-event';
import UpcomingEvents from './events/upcoming';
import PastEvents from './events/past';
import CurrentEvent from './events/current';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
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
        <HeaderBar className="headerbar" />
        <Route className="landingpage" exact path="/" component={LandingPage} />
        <Route className="dashboard" exact path="/dashboard" component={Dashboard} />
        <Route className="create-event" exact path="/events/create-event" component={CreateEvent} />
        <Route className="upcoming-events" exact path="/events/upcoming" component={UpcomingEvents} />
        <Route className="past-events" exact path="/events/past" component={PastEvents} />
        <Route className="current-event" exact path="/events/upcoming/:id" component={CurrentEvent} />
        <Route className="current-event" exact path="/events/past/:id" component={CurrentEvent} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
