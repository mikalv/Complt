import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import PouchMiddleware from 'pouch-redux-middleware';
import thunk from 'redux-thunk';
import auth from '../common/redux/auth';
import items from '../common/redux/items';
import profile from '../common/redux/profile';
import dialogs from '../common/redux/dialogs';
import syncState from '../common/redux/syncState';
import logException from '../common/utils/logException';
import db from '../common/db';
import { removeItemPouch, insertItemPouch, updateItemPouch } from '../common/redux/actions';

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
});

const middleware = applyMiddleware(thunk, pouchMiddleware);

const enhancer = compose(
  autoRehydrate(),
  middleware,
);


const store = createStore(
  combineReducers({
    items,
    auth,
    profile,
    syncState,
    dialogs,
  }),
  enhancer,
);

persistStore(store, {
  whitelist: ['auth', 'profile'],
  storage: AsyncStorage,
});

export default store;
