import React from 'react';
import { Provider } from 'react-redux';
import store, { history } from './redux/configureStore';
import OakRouter from './OakRouter';

const Root = (
  <Provider store={store}>
    <OakRouter history={history} />
  </Provider>
);

export default Root;
