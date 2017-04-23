import React from 'react';
import { Router, Route } from 'preact-router';
import { Today, Tomorrow, Overdue, Week } from './components/ItemListByDueDate';
import Inbox from './routes/Inbox';
import Account from './routes/Account';
import Login from './routes/Login';
import RootProject from './routes/RootProject';
import Project from './routes/Project';
import All from './routes/All';
import Tags from './routes/Tags';
import Tag from './routes/Tag';

const AppRouter = ({ onChange }) => (
  <Router onChange={onChange}>
    <Route path="/all" component={All} />
    <Route path="/inbox" component={Inbox} />
    <Route path="/projects" component={RootProject} />
    {/* <Redirect from="/project/inbox" to="/inbox" />
    <Redirect from="/project/root" to="/projects" /> */}
    <Route path="/project/:projectId" component={Project} />
    <Route path="/tags" component={Tags} />
    <Route path="/tag/:tag" component={Tag} />
    <Route path="/login" component={Login} />
    <Route path="/account" component={Account} />
    <Route path="/today" component={Today} />
    <Route path="/tomorrow" component={Tomorrow} />
    <Route path="/overdue" component={Overdue} />
    <Route path="/week" component={Week} />
    {/* <Redirect from="/" to="/inbox" /> */}
  </Router>
);

export default AppRouter;
