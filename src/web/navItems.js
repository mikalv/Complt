import React from 'react';
import InboxIcon from 'react-icons/lib/md/inbox';
import Assignment from 'react-icons/lib/md/assignment';
import Person from 'react-icons/lib/md/person';
import Apps from 'react-icons/lib/md/apps';
import Label from 'react-icons/lib/md/label';
import Link from 'react-router-dom/Link';

export const navItems = [{
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
