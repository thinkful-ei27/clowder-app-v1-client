import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import store from './store';
import '../src/css/index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App class="app" />
    </Router>
  </Provider>,
  document.getElementById('root')
);
