import {
  CREATE_EVENT,
  FETCH_UPCOMING_EVENTS,
  FETCH_SINGLE_UPCOMING_EVENT,
  FETCH_PAST_EVENTS,
  FETCH_SINGLE_PAST_EVENT,
  DELETE_SINGLE_PAST_EVENT
} from '../actions/events';

const initialState = {
  upcoming: [],
  past: [],
  currentEvent: null
  // formInitialValues: {

  // }
};

export default function eventReducer(state = initialState, action) {
  let event, events;
  if (action.type === CREATE_EVENT) {
    event = action.event;
    if (event.date > new Date()) {
      return Object.assign({}, state, {
        upcoming: [...state.event.upcoming, event]
      });
    } else if (event.date < new Date()) {
      return Object.assign({}, state, {
        past: [...state.event.past, event]
      });
    } else {
      return Object.assign({}, state, {});
    }
  }

  if (action.type === FETCH_UPCOMING_EVENTS) {
    events = action.events;
    return Object.assign({}, state, {
      upcoming: events,
      currentEvent: null
    });
  }

  if (action.type === FETCH_SINGLE_UPCOMING_EVENT) {
    event = action.event;
    return Object.assign({}, state, {
      currentEvent: event
    });
  }

  if (action.type === FETCH_PAST_EVENTS) {
    events = action.events;
    return Object.assign({}, state, {
      past: events,
      currentEvent: null
    });
  }

  if (action.type === FETCH_SINGLE_PAST_EVENT) {
    event = action.event;
    return Object.assign({}, state, {
      currentEvent: event
    });
  }

  if (action.type === DELETE_SINGLE_PAST_EVENT) {
    event = action.event;
    return Object.assign({}, state, {
      currentEvent: null,
      past: state.event.past.filter(item => item.id !== event.id)
    });
  }

  return state;
}