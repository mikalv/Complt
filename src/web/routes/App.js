import React from 'react';
import Menu from 'react-icons/lib/md/menu';
import Sync from 'react-icons/lib/md/sync';
import Inbox from 'react-icons/lib/md/inbox';
import Assignment from 'react-icons/lib/md/assignment';
import ArrowDropDown from 'react-icons/lib/md/arrow-drop-down';
import Person from 'react-icons/lib/md/person';
import Apps from 'react-icons/lib/md/apps';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import SelectField from 'react-md/lib/SelectFields';
import Snackbar from 'react-md/lib/Snackbars';
import Link from 'react-router/lib/Link';
import Button from 'react-md/lib/Buttons';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import { connect } from 'react-redux';
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
  itemsToShow: React.PropTypes.string,
  changeItemsToShow: React.PropTypes.func,
  syncState: React.PropTypes.shape({
    syncing: React.PropTypes.bool.isRequired,
  }),
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

function mapStateToProps({ toasts, dialogs, itemsToShow, syncState }) {
  return { toasts, dialogs, itemsToShow, syncState };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
