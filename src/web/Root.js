import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router-dom/Router';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import store from './configureStore';
import IconContext from './components/IconContext';
import history from './history';
import App from './routes/App';

const Root = (
  <Provider store={store}>
    <IconContext>
      <Router history={history}>
        <Switch>
          <Route path="/callback" />
          <Route component={App} />
        </Switch>
      </Router>
    </IconContext>
  </Provider>
);

export default Root;
