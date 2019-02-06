import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { SubmissionError } from 'redux-form';

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
