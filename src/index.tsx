import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'; // Import the configured store
import './index.css';
import App from './App'; // Import your main App component

ReactDOM.render(
  <Provider store={store}>  {/* Wrap your app with the Provider */}
    <App />
  </Provider>,
  document.getElementById('root')
);
