import React from 'react';
import { connect } from 'react-redux';
import EditUserSettingsForm from './edit-user-settings-form';
import { toggleEditing, cancelEditing } from '../../actions/users';
import requiresLogin from '../utils/requires-login';
import '../../css/event-info.css';

export class CurrentEvent extends React.Component {


  componentWillUnmount() {
    return this.props.dispatch(cancelEditing())
  }

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
            <h2 className="user-name-title">{user.username} Info</h2>
              <h2 tabIndex='0' className="info-category">Name</h2> <p tabIndex='0'>{user.fullName}</p>
              <h2 tabIndex='0'className="info-category">Username</h2> <p tabIndex='0'>{user.username}</p>
              <div className='buttons'>
                <button tabIndex='0'
                  type='button'
                  onClick={() => this.toggleEditing()}
                >Edit User Info
              </button>
                <button type="button" onClick={() => this.props.history.push('/onboarding')}>
                  Show App Help
              </button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="edit-user-home">
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