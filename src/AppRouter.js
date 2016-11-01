import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Home from './components/Home';
import Inbox from './components/Inbox';

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="inbox" component={Inbox} />
    </Route>
  </Router>
);

export default AppRouter;
