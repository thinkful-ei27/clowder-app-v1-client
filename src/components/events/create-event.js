import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../utils/requires-login';
import CreateEventForm from './create-event-form';

export function CreateEvent(props) {

  return (
      <CreateEventForm />
  );
}
const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default requiresLogin()(connect(mapStateToProps)(CreateEvent));