import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../utils/requires-login';
import '../../css/dashboard.css';
import { Link, Redirect } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import '../../css/accordion.css';

import UpcomingEvents from '../events/upcoming'
import PastEvents from '../events/past'

// const loader = document.querySelector('.loader');

export class Dashboard extends React.Component {

  componentWillMount() {
    this.onboarded = localStorage.getItem('onboarded');
  }

  componentDidMount() {
    localStorage.setItem('onboarded', true);
    // this.props.hideLoader();
  }

  // showLoader = () => loader.classList.remove('loader--hide');
  // hideLoader = () => loader.classList.add('loader--hide');

  render() {
    if (!this.onboarded) {
      return <Redirect to="/onboarding" />;
    } else {
      return (
        <div className="dashboard">
          <Accordion accordion={false}>
          <Link className="dash-item create-event-link" to='/events/create-event' ><button> + Create New Event</button></Link>
            <AccordionItem expanded="true">
              <AccordionItemTitle className="accordion-title accordion__title--animated upcoming" >
                <h2>Upcoming Events
                <div className="accordion__arrow" role="presentation" />
                </h2>
              </AccordionItemTitle>
              <AccordionItemBody>
                <UpcomingEvents />
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem >
              <AccordionItemTitle className="accordion-title accordion__title--animated past">
                <h2>Past Events
                <div className="accordion__arrow" role="presentation" />
                </h2>
              </AccordionItemTitle>
              <AccordionItemBody>
                <PastEvents />
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
          
        </div>
      );
    }
  }
}



const mapStateToProps = state => {
  // const { authToken } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: state.auth.currentUser.fullName,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
