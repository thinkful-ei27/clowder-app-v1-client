import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { SubmissionError } from 'redux-form';

// Create An Event
export const CREATE_EVENT = 'CREATE_EVENT';
export const createEventSuccess = event => ({
  type: CREATE_EVENT,
  event
});

export const createEvent = event => (dispatch, getState) => {

  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(event)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((event) => dispatch(createEventSuccess(event)))
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

// FETCH All upcoming Events
export const FETCH_UPCOMING_EVENTS = 'FETCH_UPCOMING_EVENTS';
export const storeAllUpcomingEvents = events => ({
  type: FETCH_UPCOMING_EVENTS,
  events
});


export const fetchAllUpcomingEvents = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/events/upcoming`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((events) => dispatch(storeAllUpcomingEvents(events)))
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};


// FETCH Single Upcoming Events
export const FETCH_SINGLE_UPCOMING_EVENT = 'FETCH_SINGLE_UPCOMING_EVENT';
export const storeSingleUpcomingEvent = event => ({
  type: FETCH_SINGLE_UPCOMING_EVENT,
  event
});


export const fetchSingleUpcomingEvent = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/events/upcoming/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((event) => dispatch(storeSingleUpcomingEvent(event)))
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

// FETCH All Past Events
export const FETCH_PAST_EVENTS = 'FETCH_PAST_EVENTS';
export const storeAllPastEvents = events => ({
  type: FETCH_PAST_EVENTS,
  events
});


export const fetchAllPastEvents = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/events/past`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((events) => dispatch(storeAllPastEvents(events)))
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};


// FETCH Single Past Events
export const FETCH_SINGLE_PAST_EVENT = 'FETCH_SINGLE_PAST_EVENT';
export const storeSinglePastEvent = event => ({
  type: FETCH_SINGLE_PAST_EVENT,
  event
});


export const fetchSinglePastEvent = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/events/past/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((event) => dispatch(storeSinglePastEvent(event)))
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};