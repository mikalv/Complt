import React from 'react';
import Menu from 'react-icons/lib/md/menu';
import Sync from 'react-icons/lib/md/sync';
import Inbox from 'react-icons/lib/md/inbox';
import Assignment from 'react-icons/lib/md/assignment';
import Person from 'react-icons/lib/md/person';
import Apps from 'react-icons/lib/md/apps';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import Snackbar from 'react-md/lib/Snackbars';
import Link from 'react-router/lib/Link';
import Button from 'react-md/lib/Buttons';
import { connect } from 'react-redux';
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
  leftIcon: <Inbox size={24} />,
}, {
  to: '/projects',
  key: 'projects',
  primaryText: 'Projects',
  component: Link,
  leftIcon: <Assignment size={24} />,
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
    tabletDrawerType={NavigationDrawer.DrawerTypes.FULL_HEIGHT}
    desktopDrawerType={NavigationDrawer.DrawerTypes.FULL_HEIGHT}
    toolbarTitle="Complt"
    toolbarActions={[
      <Button icon onClick={props.attemptSync}><Sync /></Button>,
    ]}
  >
    {props.children}
    <Snackbar toasts={props.toasts} onDismiss={props.dismissToast} />
    {props.dialogs.updateItem.visible ? <UpdateItemDialog /> : null}
    {props.dialogs.moveItem.visible ? <MoveItemDialog /> : null}
  </NavigationDrawer>
);

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }),
  dismissToast: React.PropTypes.func,
  attemptSync: React.PropTypes.func,
  /* eslint-disable react/no-unused-prop-types */
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
  dialogs: React.PropTypes.shape({
    updateItem: React.PropTypes.shape({
      visible: React.PropTypes.bool,
    }),
    moveItem: React.PropTypes.shape({
      visible: React.PropTypes.bool,
    }),
  }),
  /* eslint-enable react/no-unused-prop-types */
};

function mapStateToProps({ toasts, dialogs }) {
  return { toasts, dialogs };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
