import {
  CREATE_EVENT,
  FETCH_UPCOMING_EVENTS,
  FETCH_SINGLE_UPCOMING_EVENT,
  FETCH_PAST_EVENTS,
  FETCH_SINGLE_PAST_EVENT,
  DELETE_SINGLE_PAST_EVENT,
  DELETE_SINGLE_UPCOMING_EVENT,
  EDIT_SINGLE_PAST_EVENT,
  EDIT_SINGLE_UPCOMING_EVENT,
  TOGGLE_EDITING,
  FETCH_INVITE,
  CLEAR_EVENTS
} from '../actions/events';

const initialState = {
  upcoming: [],
  past: [],
  currentEvent: null,
  isEditing: false
};

export default function eventReducer(state = initialState, action) {
  let event, events;
  if (action.type === CREATE_EVENT) {
    event = action.event;
    if (event.date > new Date()) {
      return state.upcoming.slice().sort((a, b) => {
        let dateA = a.date;
        let dateB = b.date;
        if (dateA < dateB) {
          return -1;
        } if (dateA > dateB) {
          return 1;
        } return 0;
      });
    } else if (event.date < new Date()) {
      return state.upcoming.slice().sort((a, b) => {
        let dateA = a.date;
        let dateB = b.date;
        if (dateA < dateB) {
          return -1;
        } if (dateA > dateB) {
          return 1;
        } return 0;
      });
    } else {
      return Object.assign({}, state, {});
    }
  }

  if (action.type === FETCH_INVITE) {
    event = action.event;
    return Object.assign({}, state, {
      currentEvent: event
    });
  }

  if (action.type === FETCH_UPCOMING_EVENTS) {
    events = action.events;
    return Object.assign({}, state, {
      upcoming: events,
      currentEvent: null,
      isEditing: false
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
      currentEvent: null,
      isEditing: false
    });
  }

  if (action.type === FETCH_SINGLE_PAST_EVENT) {
    event = action.event;
    return Object.assign({}, state, {
      currentEvent: event
    });
  }

  if (action.type === DELETE_SINGLE_UPCOMING_EVENT) {
    event = action.event;
    return Object.assign({}, state, {
      currentEvent: null,
      upcoming: state.event.upcoming.filter(item => item.id !== event.id)
    });
  }

  if (action.type === DELETE_SINGLE_PAST_EVENT) {
    event = action.event;
    return Object.assign({}, state, {
      currentEvent: null,
      past: state.event.past.filter(item => item.id !== event.id)
    });
  }

  if (action.type === EDIT_SINGLE_UPCOMING_EVENT) {
    event = action.event;
    return Object.assign({}, state, {
      currentEvent: event,
      isEditing: false
    });
  }

  if (action.type === EDIT_SINGLE_PAST_EVENT) {
    event = action.event;
    return Object.assign({}, state, {
      currentEvent: event,
      isEditing: false
    });
  }

  if (action.type === TOGGLE_EDITING) {
    return Object.assign({}, state, {
      isEditing: !state.isEditing
    });
  }

  if (action.type === CLEAR_EVENTS) {
    return Object.assign({}, state, {
      currentEvent: null,
      isEditing: false,
      past: [],
      upcoming: []
    });
  }

  return state;
}