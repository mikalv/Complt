import React from 'react';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import PouchMiddleware from 'pouch-redux-middleware';
import RavenMiddleware from 'redux-raven-middleware';
import auth from './redux/auth';
import items from './redux/items';
import profile from './redux/profile';
import toasts from './redux/toasts';
import OakRouter from './OakRouter';
import logException from './utils/logException';
import db from './db';
import { DELETE_ITEM_POUCH, INSERT_ITEM_POUCH, UPDATE_ITEM_POUCH } from './redux/actionTypes';

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/service-worker.js');
}

global.db = db;

const pouchMiddleware = PouchMiddleware({ // eslint-disable-line new-cap
  path: '/items',
  db,
  actions: {
    remove: doc => ({ type: DELETE_ITEM_POUCH, id: doc._id }),
    insert: doc => ({ type: INSERT_ITEM_POUCH, item: doc }),
    update: doc => ({ type: UPDATE_ITEM_POUCH, item: doc }),
  },
  handleResponse: (error, data, cb) => {
    if (error) {
      logException(new Error('An error occured in pouch-redux-middleware', { error, data }));
    }
    cb(error);
  },
});

let middleware = applyMiddleware(pouchMiddleware);

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(RavenMiddleware('https://36b5c3acd9014402a6a37623aef60814@sentry.io/118415', { release: process.env.REACT_APP_GIT_REF }), pouchMiddleware); // eslint-disable-line new-cap
}

let enhancer;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(
      autoRehydrate(),
      middleware,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  enhancer = compose(
    autoRehydrate(),
    middleware
    );
}

const store = createStore(
  combineReducers({
    routing: routerReducer,
    items,
    auth,
    profile,
    toasts,
  }),
  enhancer
);

persistStore(store, {
  whitelist: ['auth', 'profile'],
});
const history = syncHistoryWithStore(browserHistory, store);

const Root = (
  <Provider store={store}>
    <OakRouter history={history} />
  </Provider>
);

export default Root;
