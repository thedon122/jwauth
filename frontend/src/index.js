import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';

import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Protected from './components/Protected';
import Content from './components/Content';

export const UserContext = React.createContext([]);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
