import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import PouchMiddleware from 'pouch-redux-middleware';
import thunk from 'redux-thunk';
import auth from '../common/redux/auth';
import items from '../common/redux/items';
import profile from '../common/redux/profile';
import dialogs from '../common/redux/dialogs';
import syncState from '../common/redux/syncState';
import itemsToShow from '../common/redux/itemsToShow';
import logException from '../common/utils/logException';
import db from '../common/db';
import { removeItemPouch, insertItemPouch, updateItemPouch, initialItemsLoaded } from '../common/redux/actions';

const pouchMiddleware = PouchMiddleware({
  path: '/items',
  db,
  actions: {
    remove: removeItemPouch,
    insert: insertItemPouch,
    update: updateItemPouch,
  },
  handleResponse: (error, data, cb) => {
    if (error) {
      logException(new Error('An error occured in pouch-redux-middleware', { error, data }));
    }
    cb(error);
  },
  initialBatchDispatched() {
    store.dispatch(initialItemsLoaded());
  },
});

const analyticsMiddleware = () => next => (action) => {
  next(action);
  if (!action.type.match(/(POUCH|INITIAL_ITEMS_LOADED|persist)/)) {
    window.ga('send', 'event', 'redux', action.type);
  }
};

const middleware = applyMiddleware(thunk, pouchMiddleware, analyticsMiddleware);

let enhancer;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(
      autoRehydrate(),
      middleware,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
} else {
  enhancer = compose(
    autoRehydrate(),
    middleware,
    );
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
  enhancer,
);

persistStore(store, {
  whitelist: ['auth', 'profile', 'itemsToShow'],
});


export default store;
