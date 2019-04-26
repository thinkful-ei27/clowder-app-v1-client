import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../utils/requires-login';
import '../css/event-info.css';
import moment from 'moment';

export class TimeTest extends React.Component {

  formatTime(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  // THIS IS THE SUBMIT CALLBACK ONSUBMIT FOR THE SUBMIT EDIT EVENT
  // (id, event) => this.editEventInfo(id, event)

  EventDetails(props) {
    const testDate = '1989-02-03';
    console.log('testDate:', testDate)
    const testTime = '07:20';
    console.log('testTime:', testTime)

    const prettyDate = moment(testDate).format('ddd MMMM Do YYYY');
    console.log('prettyDate:', prettyDate)
    const prettyTime = moment(testTime).format('hh:mm ');
    console.log('prettyTime:', prettyTime)


    console.log(testTime.slice(3, 5))
    const dateAndTime = moment(testDate).add({ hours: testTime.slice(0, 2), minutes: testTime.slice(3, 5) }).format()

    console.log(dateAndTime)
    console.log(moment().format())


    if (!this.props.isEditing) {
      return (
        <section className='single-event-home'>
          <div className='event-info'>
            <h4>Date:</h4> <p>{prettyDate}</p>
            <h4>Time:</h4> <p>{prettyTime}</p>
          </div>

        </section>
      );
    }
  }

  render() {
    return (
      this.EventDetails(this.props)
    );
  }
}



const mapStateToProps = state => {

  return {

    isEditing: state.event.isEditing,
  };
};

export default requiresLogin()(connect(mapStateToProps)(TimeTest));