import {
  CREATE_EVENT,
} from '../actions/events';

const initialState = {
  upcomingEvents: [],
};

export default function eventReducer(state = initialState, action) {
  const event = {
    eventName: action.eventName,
    date: action.date,
    time: action.time,
    location: action.location,
    description: action.description,
    viewingCode: action.viewingCode
  };
  if (action.type === CREATE_EVENT) {
    return Object.assign({}, state, {
      upcomingEvents: [...state.upcomingEvents, event]
    });
  }
  return state;
}