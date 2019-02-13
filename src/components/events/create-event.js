import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../utils/requires-login';

import CreateEventForm from './create-event-form';

export function CreateEvent(props) {

  return (
    <div className="create-event-home">
      <h2>Create an Event</h2>
      <CreateEventForm />
    </div>
  );
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default requiresLogin()(connect(mapStateToProps)(CreateEvent));