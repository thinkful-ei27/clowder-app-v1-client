import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import EditUserSettingsForm from './edit-user-settings-form';
import { toggleEditing, editUserSuccess } from '../../actions/users';
import requiresLogin from '../requires-login';

export class CurrentEvent extends React.Component {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard

  // componentDidMount() {
  //   this.props.dispatch(editUserSuccess(this.props.currentUser));
  // }

  toggleEditing() {
    return this.props.dispatch(toggleEditing());
  }

  UserDetails(props) {
    const user = props.currentUser;
    if (!user) {
      return <div>loading</div>;
    } if (user) {
      if (!this.props.isEditing) {
        return (
          <div className='user-info-home'>
            <div className='user-info'>
              <h4>Name</h4> {user.fullName}
              <h4>Username</h4> {user.username}
            </div>
            <button
              type='button'
              onClick={() => this.toggleEditing()}
            >Edit Info/Change Password
            </button>
          </div>
        );
      } else {
        return (
          <EditUserSettingsForm />
        );
      }
    }
  }
  render() {
    return (
      this.UserDetails(this.props)
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  isEditing: state.auth.isEditing,
  username: state.auth.currentUser.username,
  name: state.auth.currentUser.fullName,
  currentUser: state.auth.currentUser,
});

export default requiresLogin()(connect(mapStateToProps)(CurrentEvent));