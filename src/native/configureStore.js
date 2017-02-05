import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import PouchMiddleware from 'pouch-redux-middleware';
import RavenMiddleware from 'redux-raven-middleware';
import { reducer as formReducer } from 'redux-form';
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

let middleware = applyMiddleware(thunk, pouchMiddleware);

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(RavenMiddleware('https://36b5c3acd9014402a6a37623aef60814@sentry.io/118415', { release: process.env.REACT_APP_GIT_REF }), thunk, pouchMiddleware);
}

const enhancer = compose(
  autoRehydrate(),
  middleware
);


const store = createStore(
  combineReducers({
    items,
    auth,
    profile,
    syncState,
    dialogs,
    form: formReducer,
  }),
  enhancer
);

persistStore(store, {
  whitelist: ['auth', 'profile'],
  storage: AsyncStorage,
});

export default store;
