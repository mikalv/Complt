/* eslint-disable  no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRouter from './AppRouter';
import './index.css';

injectTapEventPlugin();
ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
);
