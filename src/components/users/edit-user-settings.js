import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditUserSettingsForm from './edit-user-settings-form';
import { toggleEditing } from '../../actions/users';
import requiresLogin from '../requires-login';
import '../css/event-info.css';

export class CurrentEvent extends React.Component {


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
              <h2>Name</h2> <p>{user.fullName}</p>
              <h2>Username</h2> <p>{user.username}</p>
            </div>
            <div className='buttons'>
              <button
                type='button'
                onClick={() => this.toggleEditing()}
              >Edit User Info
              </button>

              <Link to='/onboarding' >
                <button>
                  Show Instructions
                </button>
              </Link>

            </div>
          </div>
        );
      } else {
        return (
          <div className="edit-user-home">
            <h2>Change Your Settings</h2>
            <EditUserSettingsForm />
          </div>
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