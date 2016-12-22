/* eslint-disable no-param-reassign */
import React from 'react';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import ApolloClient, { createNetworkInterface, addTypename, applyAfterware } from 'apollo-client'; // eslint-disable-line no-unused-vars
import { ApolloProvider } from 'react-apollo';
import drawer from './redux/drawer';
import auth from './redux/auth';
import OakRouter from './OakRouter';
import MuiTheme from './MuiTheme';

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/service-worker.js');
}

const networkInterface = createNetworkInterface({ uri: process.env.REACT_APP_API_URL });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) req.options.headers = {};
    const token = localStorage.getItem('token') || null;
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  },
}]).useAfter([{
  applyAfterware({ response }, next) {
    if (response.status === 401) browserHistory.push('/login');
    next();
  },
}]);


const client = new ApolloClient({
  networkInterface,
  queryTransformer: addTypename,
  dataIdFromObject(result) {
    if (result.__typename && result.id) {
      return `${result.__typename}:${result.id}}`;
    }
    return null;
  },
});

let enhancer;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(
      autoRehydrate(),
      applyMiddleware(client.middleware()),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  enhancer = compose(
    autoRehydrate(),
    applyMiddleware(client.middleware())
    );
}

const store = createStore(
  combineReducers({
    routing: routerReducer,
    drawer,
    auth,
    apollo: client.reducer(),
  }),
  enhancer
);

persistStore(store, {
  whitelist: ['auth'],
});
const history = syncHistoryWithStore(browserHistory, store);

const Root = (
  <ApolloProvider store={store} client={client}>
    <MuiTheme>
      <OakRouter history={history} />
    </MuiTheme>
  </ApolloProvider>
);

export default Root;
