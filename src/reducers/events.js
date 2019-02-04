import {
  CREATE_EVENT,
} from '../actions/events';

const initialState = {
  eventName: '',
  date: '',
  viewingCode: null,
  location: '',
  description: ''
};

export default function eventReducer(state = initialState, action) {
  if (action.type === CREATE_EVENT) {
    return Object.assign({}, state, {
      eventName: action.eventName,
      date: action.date,
      location: action.location,
      description: action.description,
      viewingCode: action.viewingCode
    });
  }
  return state;
}