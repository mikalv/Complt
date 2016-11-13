import React from 'react';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Provider } from 'react-redux';
import projects from './redux/projects';
import drawer from './redux/drawer';
import auth from './redux/auth';
import OakRouter from './OakRouter';

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/service-worker.js');
}

let enhancer;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(
      autoRehydrate(),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  enhancer = autoRehydrate();
}

const store = createStore(
  combineReducers({
    routing: routerReducer,
    drawer,
    projects,
    auth,
  }),
  enhancer
);

persistStore(store, {
  whitelist: ['projects', 'auth'],
});
const history = syncHistoryWithStore(browserHistory, store);

const Root = (
  <Provider store={store}>
    <OakRouter history={history} />
  </Provider>
);

export default Root;
