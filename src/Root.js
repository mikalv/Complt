import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Provider } from 'react-redux';
import App from './App';
import Home from './components/Home';
import Inbox from './components/Inbox';
import projects from './redux/projects';
import drawer from './redux/drawer';

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/service-worker.js');
}

const store = createStore(
  combineReducers({
    routing: routerReducer,
    drawer,
    projects,
  }),
  compose(
    process.env.NODE_ENV === 'production' ?
      autoRehydrate() :
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (process.env.NODE_ENV === 'production') {
  persistStore(store, {
    whitelist: 'projects',
  });
}
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
