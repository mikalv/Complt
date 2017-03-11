import React from 'react';
import Menu from 'react-icons/lib/md/menu';
import Sync from 'react-icons/lib/md/sync';
import InboxIcon from 'react-icons/lib/md/inbox';
import Assignment from 'react-icons/lib/md/assignment';
import ArrowDropDown from 'react-icons/lib/md/arrow-drop-down';
import Person from 'react-icons/lib/md/person';
import Apps from 'react-icons/lib/md/apps';
import Label from 'react-icons/lib/md/label';
import NavigationDrawer from 'react-md/lib/NavigationDrawers/NavigationDrawer';
import SelectField from 'react-md/lib/SelectFields/SelectField';
import Snackbar from 'react-md/lib/Snackbars';
import Link from 'react-router-dom/Link';
import Button from 'react-md/lib/Buttons/Button';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import { connect } from 'react-redux';
import Route from 'react-router/Route';
import Switch from 'react-router/Switch';
import Redirect from 'react-router/Redirect';
import Inbox from './Inbox';
import Account from './Account';
import Login from './Login';
import RootProject from './RootProject';
import Project from './Project';
import All from './All';
import Tags from './Tags';
import Tag from './Tag';
import { values as itemsToShowValues } from '../../common/redux/itemsToShow';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import UpdateItemDialog from '../components/UpdateItemDialog';
import MoveItemDialog from '../components/MoveItemDialog';

const navItems = [{
  to: '/all',
  key: 'all',
  primaryText: 'All',
  component: Link,
  leftIcon: <Apps size={24} />,
}, {
  to: '/inbox',
  key: 'inbox',
  primaryText: 'Inbox',
  component: Link,
  leftIcon: <InboxIcon size={24} />,
}, {
  to: '/projects',
  key: 'projects',
  primaryText: 'Projects',
  component: Link,
  leftIcon: <Assignment size={24} />,
}, {
  to: '/tags',
  key: 'tags',
  primaryText: 'Tags',
  component: Link,
  leftIcon: <Label size={24} />,
}, {
  to: '/account',
  key: 'account',
  primaryText: 'Account',
  component: Link,
  leftIcon: <Person size={24} />,
}];

export function navItemsWithActive(items, route) {
  return items.map((item) => {
    if (route === item.to) {
      return {
        ...item,
        active: true,
      };
    }
    return item;
  });
}

export const App = props => (
  <NavigationDrawer
    header={<div />}
    temporaryIconChildren={<Menu />}
    navItems={navItemsWithActive(navItems, props.location.pathname)}
    mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
    tabletDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
    desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
    toolbarTitleMenu={
      <SelectField
        id="items-to-show-selection"
        menuItems={itemsToShowValues}
        iconChildren={<ArrowDropDown size={24} />}
        value={props.itemsToShow}
        onChange={props.changeItemsToShow}
      />}
    toolbarActions={[
      props.syncState.syncing ? <div style={{ margin: '10px' }}><CircularProgress id="syncing-spinner" /></div> : <Button icon onClick={props.attemptSync}><Sync /></Button>,
    ]}
  >
    <Switch>
      <Route path="/all" component={All} />
      <Route path="/inbox" component={Inbox} />
      <Route path="/projects" component={RootProject} />
      <Redirect from="/project/inbox" to="/inbox" />
      <Redirect from="/project/root" to="/projects" />
      <Route path="/project/:projectId" component={Project} />
      <Route path="/tags" component={Tags} />
      <Route path="/tag/:tag" component={Tag} />
      <Route path="/login" component={Login} />
      <Route path="/account" component={Account} />
      <Redirect from="/" to="/inbox" />
    </Switch>
    <Snackbar toasts={props.toasts} onDismiss={props.dismissToast} />
    <UpdateItemDialog />
    <MoveItemDialog />
  </NavigationDrawer>
);

App.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }),
  dismissToast: React.PropTypes.func,
  attemptSync: React.PropTypes.func,
  itemsToShow: React.PropTypes.string,
  changeItemsToShow: React.PropTypes.func,
  syncState: React.PropTypes.shape({
    syncing: React.PropTypes.bool.isRequired,
  }),
  toasts: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    action: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.shape({
        onClick: React.PropTypes.func,
        label: React.PropTypes.string.isRequired,
      }),
    ]),
  })).isRequired,
};

function mapStateToProps({ toasts, itemsToShow, syncState }) {
  return { toasts, itemsToShow, syncState };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
