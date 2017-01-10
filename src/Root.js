import React from 'react';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import PouchMiddleware from 'pouch-redux-middleware';
import auth from './redux/auth';
import items from './redux/items';
import OakRouter from './OakRouter';
import db from './db';
import { DELETE_ITEM_POUCH, INSERT_ITEM_POUCH, UPDATE_ITEM_POUCH } from './redux/actionTypes';

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/service-worker.js');
}

const pouchMiddleware = PouchMiddleware({ // eslint-disable-line new-cap
  path: '/items',
  db,
  actions: {
    remove: doc => ({ type: DELETE_ITEM_POUCH, id: doc._id }),
    insert: doc => ({ type: INSERT_ITEM_POUCH, item: doc }),
    update: doc => ({ type: UPDATE_ITEM_POUCH, item: doc }),
  },
});

let enhancer;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(
      autoRehydrate(),
      applyMiddleware(pouchMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  enhancer = compose(
    autoRehydrate(),
    applyMiddleware(pouchMiddleware)
    );
}

const store = createStore(
  combineReducers({
    routing: routerReducer,
    items,
    auth,
  }),
  enhancer
);

persistStore(store, {
  whitelist: ['auth'],
});
const history = syncHistoryWithStore(browserHistory, store);

const Root = (
  <Provider store={store}>
    <OakRouter history={history} />
  </Provider>
);

export default Root;
