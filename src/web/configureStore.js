import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import PouchMiddleware from 'pouch-redux-middleware';
import thunk from 'redux-thunk';
import auth from '../common/redux/auth';
import items from '../common/redux/items';
import profile from '../common/redux/profile';
import dialogs from '../common/redux/dialogs';
import syncState from '../common/redux/syncState';
import itemsToShow from '../common/redux/itemsToShow';
import db from '../common/db';
import {
  removeItemPouch,
  insertItemPouch,
  updateItemPouch,
  batchInsertItemPouch,
} from '../common/redux/actions';
import ga from './analytics';

const pouchMiddleware = PouchMiddleware({
  path: 'items',
  db,
  actions: {
    remove: removeItemPouch,
    insert: insertItemPouch,
    update: updateItemPouch,
    batchInsert: batchInsertItemPouch,
  },
});

const analyticsMiddleware = () => next => action => {
  next(action);
  if (!action.type.match(/(POUCH|INITIAL_ITEMS_LOADED|persist)/)) {
    ga.send('event', { ec: 'redux', ea: action.type });
  }
};

const middleware = applyMiddleware(thunk, pouchMiddleware, analyticsMiddleware);

let enhancer;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  enhancer = middleware;
}

const store = createStore(
  combineReducers({
    items,
    auth,
    profile,
    syncState,
    dialogs,
    itemsToShow,
  }),
  enhancer
);

import(/* webpackChunkName: "redux-persist" */ 'redux-persist/es/persistStore').then(
  ({ default: persistStore }) => {
    persistStore(store, {
      whitelist: ['auth', 'profile', 'itemsToShow'],
    });
  }
);

export default store;
