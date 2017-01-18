import React from 'react';
import { Provider } from 'react-redux';
import store, { history } from './redux/configureStore';
import IconContext from './components/IconContext';
import OakRouter from './OakRouter';

const Root = (
  <Provider store={store}>
    <IconContext>
      <OakRouter history={history} />
    </IconContext>
  </Provider>
);

export default Root;
