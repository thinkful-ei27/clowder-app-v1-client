import {
  CREATE_EVENT, FETCH_EVENTS, FETCH_EVENT
} from '../actions/events';

const initialState = {
  upcoming: [],
  past: [],
  currentEvent: ''
  // formInitialValues: {

  // }
};

export default function eventReducer(state = initialState, action) {
  let event, events;
  if (action.type === CREATE_EVENT) {
    event = action.event;
    return Object.assign({}, state, {
      upcoming: [...state.upcoming, event]
    });
  }

  if (action.type === FETCH_EVENTS) {
    events = action.events;
    return Object.assign({}, state, {
      upcoming: events
    });
  }

  if (action.type === FETCH_EVENT) {
    event = action.event;
    return Object.assign({}, state, {
      currentEvent: event
    });
  }

  return state;
}