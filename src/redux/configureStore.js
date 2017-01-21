import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import PouchMiddleware from 'pouch-redux-middleware';
import RavenMiddleware from 'redux-raven-middleware';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import browserHistory from '../history';
import auth from './auth';
import items from './items';
import profile from './profile';
import toasts from './toasts';
import dialogs from './dialogs';
import syncState from './syncState';
import logException from '../utils/logException';
import db from '../db';
import { removeItemPouch, insertItemPouch, updateItemPouch } from './actions';

const pouchMiddleware = PouchMiddleware({ // eslint-disable-line new-cap
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

let middleware = applyMiddleware(thunk, pouchMiddleware, routerMiddleware(browserHistory));

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(RavenMiddleware('https://36b5c3acd9014402a6a37623aef60814@sentry.io/118415', { release: process.env.REACT_APP_GIT_REF }), thunk, pouchMiddleware, routerMiddleware(browserHistory)); // eslint-disable-line new-cap
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
    syncState,
    dialogs,
    form: formReducer,
  }),
  enhancer
);

persistStore(store, {
  whitelist: ['auth', 'profile'],
});
const history = syncHistoryWithStore(browserHistory, store);


export default store;
export { history };
