import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../utils/requires-login';

import CreateEventForm from './create-event-form';

export function CreateEvent(props) {

  return (
    <div className="create-event-home">
      <h3>Create an Event</h3>
      <CreateEventForm />
    </div>
  );
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default requiresLogin()(connect(mapStateToProps)(CreateEvent));