import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router/Router';
import Route from 'react-router/Route';
import Switch from 'react-router/Switch';
import store from './configureStore';
import IconContext from './components/IconContext';
import history from './history';
import App from './routes/App';

history.listen((location) => {
  window.ga('set', 'page', location.pathname);
  window.ga('send', 'pageview');
});

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
