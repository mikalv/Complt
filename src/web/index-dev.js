/* eslint-disable global-require */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';
import './index.scss';

window.ga = () => {};

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    {Root}
  </AppContainer>,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;

    ReactDOM.render(
      <AppContainer>
        {NextApp}
      </AppContainer>,
      rootEl,
    );
  });
}
