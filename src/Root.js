import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Provider } from 'react-redux';
import App from './App';
import Home from './components/Home';
import Inbox from './components/Inbox';
import projects from './redux/projects';


const store = createStore(
  combineReducers({
    routing: routerReducer,
    projects,
  }),
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    autoRehydrate()
  )
);

persistStore(store, {
  blacklist: 'routing',
});

const history = syncHistoryWithStore(browserHistory, store);

const Root = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="inbox" component={Inbox} />
      </Route>
    </Router>
  </Provider>
);

export default Root;
