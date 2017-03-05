import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router-dom/Router';
import Route from 'react-router-dom/Route';
import store from './configureStore';
import IconContext from './components/IconContext';
import history from './history';
import App from './routes/App';

const Root = (
  <Provider store={store}>
    <IconContext>
      <Router history={history}>
        <div>
          <Route component={App} />
          <Route path="/callback" />
        </div>
      </Router>
    </IconContext>
  </Provider>
);

export default Root;
