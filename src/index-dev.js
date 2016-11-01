/* eslint-disable global-require */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import router from './router';
import './index.css';

injectTapEventPlugin();

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    {router}
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./router', () => {
    const NextApp = require('./router').default;

    ReactDOM.render(
      <AppContainer>
        {NextApp}
      </AppContainer>,
      rootEl
    );
  });
}
