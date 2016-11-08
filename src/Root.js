import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Provider } from 'react-redux';
import OfflinePlugin from 'offline-plugin/runtime';
import App from './App';
import Home from './components/Home';
import Inbox from './components/Inbox';
import projects from './redux/projects';
import drawer from './redux/drawer';
import history from './history';

if (process.env.PLAT === 'web') {
  OfflinePlugin.install({
    onUpdateReady: () => {
      OfflinePlugin.applyUpdate();
    },
  });
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
const historyWithStore = syncHistoryWithStore(history, store);

const Root = (
  <Provider store={store}>
    <Router history={historyWithStore}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="inbox" component={Inbox} />
      </Route>
    </Router>
  </Provider>
);

export default Root;
