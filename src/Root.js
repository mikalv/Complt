import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import Home from './components/Home';
import Inbox from './components/Inbox';
import projects from './projects';

const store = createStore(
  combineReducers({
    routing: routerReducer,
    projects,
  }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const history = syncHistoryWithStore(browserHistory, store);

const Root = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="inbox" component={Inbox} />
      </Route>
    </Router>
  </Provider>
);

export default Root;
