import React from 'react';
import { Provider } from 'react-redux';
import store, { history } from './redux/configureStore';
import IconContext from './components/IconContext';
import CompltRouter from './CompltRouter';

const Root = (
  <Provider store={store}>
    <IconContext>
      <CompltRouter history={history} />
    </IconContext>
  </Provider>
);

export default Root;
