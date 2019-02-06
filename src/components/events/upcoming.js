import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchUpcomingEvents, fetchEvents } from '../../actions/events';



export class UpcomingEvents extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUpcomingEvents())
      .then(fetchEvents);
  }

  EventsList(props) {
    console.log(props.upcoming[0]);
    const events = this.props.upcoming.map((event, index) => (
      <li key={index}>
        {event.eventName}
      </li>
    ));

    return (
      <ul className="upcoming-events" id="upcoming-events">
        {events}
      </ul>
    );
  }

  render() {
    return (
      this.EventsList(this.props)
    );
  }
}

const mapStateToProps = state => {

  return {
    username: state.auth.currentUser.username,
    name: state.auth.currentUser.fullName,
    upcoming: state.event.upcoming
  };
};


export default requiresLogin()(connect(mapStateToProps)(UpcomingEvents));