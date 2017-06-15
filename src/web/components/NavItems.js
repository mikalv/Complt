import { h } from 'preact';
import { route } from 'preact-router';
import InboxIcon from 'react-icons/lib/md/inbox';
import Assignment from 'react-icons/lib/md/assignment';
import Person from 'react-icons/lib/md/person';
import Today from 'react-icons/lib/md/today';
import Apps from 'react-icons/lib/md/apps';
import Label from 'react-icons/lib/md/label';
import { Link } from 'preact-router/match';
import LinkListItem from './LinkListItem';

export const navItems = [
  {
    href: '/all',
    text: 'All',
    icon: Apps,
  },
  {
    href: '/inbox',
    text: 'Inbox',
    icon: InboxIcon,
  },
  {
    href: '/projects',
    text: 'Projects',
    icon: Assignment,
  },
  {
    href: '/tags',
    text: 'Tags',
    icon: Label,
  },
  {
    href: '/overdue',
    text: 'Overdue',
    icon: Today,
  },
  {
    href: '/today',
    text: 'Today',
    icon: Today,
  },
  {
    href: '/tomorrow',
    text: 'Tomorrow',
    icon: Today,
  },
  {
    href: '/week',
    text: 'Next 7 Days',
    icon: Today,
  },
  {
    href: '/account',
    text: 'Account',
    icon: Person,
  },
];

const navItemsCache = {};

const renderNavItems = ({ activeClassName }) => {
  if (navItemsCache[activeClassName] !== undefined)
    return navItemsCache[activeClassName];
  return navItems.map(Item => (
    <LinkListItem
      Component={Link}
      onClick={e => {
        e.preventDefault();
        route(Item.href);
      }}
      href={Item.href}
      activeClassName={activeClassName}
    >
      <Item.icon className="mdc-list-item__start-detail" />
      {Item.text}
    </LinkListItem>
  ));
};

export default renderNavItems;
