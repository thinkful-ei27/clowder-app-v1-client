import {
  CREATE_EVENT,
} from '../actions/events';

const initialState = {
  events: []
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