import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import store from './store';
import '../src/css/index.css';

const loader = document.querySelector('.loader');
// if you want to show the loader when React loads data again
const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App
        class="app"
        hideLoader={hideLoader}
        showLoader={showLoader}
      />
    </Router>
  </Provider>,
  document.getElementById('app')
);