import React from 'react';
import Menu from 'react-icons/lib/md/menu';
import Sync from 'react-icons/lib/md/sync';
import ArrowDropDown from 'react-icons/lib/md/arrow-drop-down';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import SelectField from 'react-md/lib/SelectFields/SelectField';
import Button from 'react-md/lib/Buttons/Button';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import AppRouter from '../AppRouter';
import { navItems, navItemsWithActive } from '../navItems';
import { values as itemsToShowValues } from '../../common/redux/itemsToShow';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import './App.scss';

const Dialogs = Loadable({
  loader: () => import('../components/Dialogs'),
  LoadingComponent: () => null,
  webpackRequireWeakId: () => require.resolveWeak('../components/Dialogs'),
});

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
    contentClassName="flex mdc-theme--dark"
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
    <Dialogs />
  </NavigationDrawer>
);

function mapStateToProps({ toasts, itemsToShow, syncState, profile }) {
  return { toasts, itemsToShow, syncState, profile };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
