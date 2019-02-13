import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { loadAuthToken } from './actions/local-storage';
import authReducer from './reducers/auth';
import eventReducer from './reducers/events';
import { setAuthToken, refreshAuthToken } from './actions/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const appReducer = combineReducers({
//   form: formReducer,
//   auth: authReducer,
//   event: eventReducer
// });

// const rootReducer = (state, action) => {
//   return appReducer(state, action);
// };

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    event: eventReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
