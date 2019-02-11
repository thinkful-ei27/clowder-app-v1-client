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
  console.log(event);
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
    .then((event) => {
      dispatch(createEventSuccess(event));
    })
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

// FETCH Invite
export const FETCH_INVITE = 'FETCH_INVITE';
export const storeInvite = event => ({
  type: FETCH_INVITE,
  event
});
export const fetchSingleInvite = id => (dispatch) => {
  return fetch(`${API_BASE_URL}/invites/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((event) => dispatch(storeInvite(event)))
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

// DELETE Single UPCOMING Event
export const DELETE_SINGLE_UPCOMING_EVENT = 'DELETE_SINGLE_UPCOMING_EVENT';
export const removeUpcomingEvent = event => ({
  type: DELETE_SINGLE_UPCOMING_EVENT,
  event
});
export const deleteSingleUpcomingEvent = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/events/upcoming/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => dispatch(removeUpcomingEvent()))
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

// DELETE Single PAST Event
export const DELETE_SINGLE_PAST_EVENT = 'DELETE_SINGLE_PAST_EVENT';
export const removePastEvent = event => ({
  type: DELETE_SINGLE_PAST_EVENT,
  event
});
export const deleteSinglePastEvent = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/events/past/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => dispatch(removePastEvent()))
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

// EDIT Upcoming Event
export const EDIT_SINGLE_UPCOMING_EVENT = 'EDIT_SINGLE_UPCOMING_EVENT';
export const changeUpcomingEvent = event => ({
  type: EDIT_SINGLE_UPCOMING_EVENT,
  event
});
export const updateSingleUpcomingEvent = (id, event) => (dispatch, getState) => {
  console.log('hello?')
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/events/upcoming/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(event)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((event) => dispatch(changeUpcomingEvent(event)))
    .catch(err => {
      console.log(err)
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

// EDIT Past Event
export const EDIT_SINGLE_PAST_EVENT = 'EDIT_SINGLE_PAST_EVENT';
export const changePastEvent = event => ({
  type: EDIT_SINGLE_PAST_EVENT,
  event
});
export const updateSinglePastEvent = (id, event) => (dispatch, getState) => {
  console.log(API_BASE_URL)
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/events/past/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(event)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((event) => dispatch(changePastEvent(event)))
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

export const TOGGLE_EDITING = 'TOGGLE_EDITING';
export const toggleEditing = () => ({
  type: TOGGLE_EDITING,
});