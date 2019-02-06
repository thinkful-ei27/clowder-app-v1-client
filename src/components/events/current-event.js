import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchEvent, fetchSingleEvent } from '../../actions/events';
import '../css/event-lists.css';

export class CurrentEvent extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleEvent())
      .then(fetchEvent);
  }

  EventDetails(props) {
    const event = this.props.currentEvent;
    return (
      <p>{event}</p>
    );
  }

  render() {
    return (
      this.EventDetails(this.props)
    );
  }
}

const mapStateToProps = state => {

  return {
    username: state.auth.currentUser.username,
    name: state.auth.currentUser.fullName,
    currentEvent: state.event.currentEvent
  };
};

export default requiresLogin()(connect(mapStateToProps)(CurrentEvent));