import {
  CREATE_EVENT,
} from '../actions/events';

const initialState = {
  upcomingEvents: [],
};

export default function eventReducer(state = initialState, action) {
  let event;
  if (action.type === CREATE_EVENT) {
    console.log(action);
    event = action.event;

    console.log(event);
    return Object.assign({}, state, {
      upcomingEvents: [...state.upcomingEvents, event]
    });
  }
  return state;
}