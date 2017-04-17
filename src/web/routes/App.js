import React from 'react';
import Menu from 'react-icons/lib/md/menu';
import Sync from 'react-icons/lib/md/sync';
import ArrowDropDown from 'react-icons/lib/md/arrow-drop-down';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import SelectField from 'react-md/lib/SelectFields/SelectField';
import Snackbar from 'react-md/lib/Snackbars';
import Button from 'react-md/lib/Buttons/Button';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';
import { connect } from 'react-redux';
import AppRouter from '../AppRouter';
import { navItems, navItemsWithActive } from '../navItems';
import { values as itemsToShowValues } from '../../common/redux/itemsToShow';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import UpdateItemDialog from '../components/UpdateItemDialog';
import MoveItemDialog from '../components/MoveItemDialog';
import PropTypes from '../../common/PropTypes';
import './App.scss';

export const App = props => (
  <NavigationDrawer
    drawerHeader={
      <Toolbar
        title={props.profile.name}
        prominentTitle
        colored
        className="md-background--secondary"
      />}
    temporaryIconChildren={<Menu />}
    navItems={navItemsWithActive(navItems, props.location.pathname)}
    mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
    tabletDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
    desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
    contentClassName="flex"
    toolbarTitleMenu={
      <SelectField
        id="items-to-show-selection"
        menuItems={itemsToShowValues}
        iconChildren={<ArrowDropDown size={24} />}
        value={props.itemsToShow}
        onChange={props.changeItemsToShow}
      />}
    toolbarActions={[
      props.syncState.syncing ? <div className="syncing-spinner-container md-btn md-btn--icon"><CircularProgress id="syncing-spinner" /></div> : <Button icon onClick={props.attemptSync}><Sync /></Button>,
    ]}
  >
    <AppRouter />
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
  profile: PropTypes.profile,
};

function mapStateToProps({ toasts, itemsToShow, syncState, profile }) {
  return { toasts, itemsToShow, syncState, profile };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
