/** @jsx h */
import { h } from 'preact';
import { route } from 'preact-router';
import InboxIcon from 'preact-icons/lib/md/inbox';
import Assignment from 'preact-icons/lib/md/assignment';
import Person from 'preact-icons/lib/md/person';
import Today from 'preact-icons/lib/md/today';
import Apps from 'preact-icons/lib/md/apps';
import Label from 'preact-icons/lib/md/label';
import List from 'preact-material-components/List';
import { Link } from './Match';
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
    href: '/overdue',
    text: 'Overdue',
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

const NavItems = ({ activeClassName, onListClick }) => (
  <List onClick={onListClick}>
    {navItems.map(Item => (
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
    ))}
  </List>
);

export default NavItems;
