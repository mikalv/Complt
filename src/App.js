import React from 'react';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import FontIcon from 'react-md/lib/FontIcons';
import Link from 'react-router/lib/Link';

const navItems = [{
  to: '/inbox',
  key: 'inbox',
  primaryText: 'Inbox',
  component: Link,
  leftIcon: <FontIcon>inbox</FontIcon>,
}, {
  to: '/projects',
  key: 'projects',
  primaryText: 'Projects',
  component: Link,
  leftIcon: <FontIcon>assignment</FontIcon>,
}, {
  to: '/account',
  key: 'account',
  primaryText: 'Account',
  component: Link,
  leftIcon: <FontIcon>person</FontIcon>,
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

const App = props => (
  <NavigationDrawer
    header={<div />}
    navItems={navItemsWithActive(navItems, props.location.pathname)}
    mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
    tabletDrawerType={NavigationDrawer.DrawerTypes.FULL_HEIGHT}
    desktopDrawerType={NavigationDrawer.DrawerTypes.FULL_HEIGHT}
    toolbarTitle="Oak"
  >
    {props.children}
  </NavigationDrawer>
);

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }),
};

export default App;
