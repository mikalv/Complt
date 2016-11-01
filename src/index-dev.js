/* eslint-disable global-require */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRouter from './AppRouter';
import './index.css';

injectTapEventPlugin();

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <AppRouter />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./AppRouter', () => {
    const NextApp = require('./AppRouter').default;

    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}
