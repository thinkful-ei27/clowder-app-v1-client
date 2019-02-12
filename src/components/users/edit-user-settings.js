import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import EditUserSettingsForm from './edit-user-settings-form';
import { HeaderBar } from '../header-bar';

export function EditUserSettings(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (!props.loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="home">
      <HeaderBar />
      <EditUserSettingsForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(EditUserSettings);