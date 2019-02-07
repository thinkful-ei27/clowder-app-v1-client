import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchSingleUpcomingEvent } from '../../actions/events';


export class CurrentEvent extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchSingleUpcomingEvent(id));
  }

  EventDetails(props) {
    const event = props.currentEvent;
    return (
      <div className='single-event-home'>
        <h3>{event.eventName}</h3>
        <h4>Date:</h4> {event.date}
        <h4>Time:</h4> {event.time}
        <h4>Location:</h4> {event.location}
        <h4>Description:</h4> {event.description}
      </div>
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