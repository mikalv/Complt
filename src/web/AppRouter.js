import { h } from 'preact';
import { Router } from 'preact-router';
import { Today, Tomorrow, Overdue, Week } from './components/ItemListByDueDate';
import Account from './routes/Account';
import Login from './routes/Login';
import Projects from './components/Projects';
import All from './routes/All';
import Tags from './routes/Tags';
import Tag from './routes/Tag';

const AppRouter = ({ onChange }) => (
  <Router onChange={onChange}>
    <All path="/all" />
    <Projects path="/inbox" projectId="inbox" />
    <Projects
      path="/projects"
      projectId="root"
      initialIsProject
      canChangeType
    />
    <Projects path="/project/:projectId" initialIsProject canChangeType />
    <Tags path="/tags" />
    <Tag path="/tag/:tag" />
    <Login path="/login" />
    <Account path="/account" />
    <Today path="/today" />
    <Tomorrow path="/tomorrow" />
    <Overdue path="/overdue" />
    <Week path="/week" />
  </Router>
);

export default AppRouter;
