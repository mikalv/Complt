/** @jsx h */
import { h } from 'preact';
import InboxIcon from 'react-icons/lib/md/inbox';
import Assignment from 'react-icons/lib/md/assignment';
import Person from 'react-icons/lib/md/person';
import Today from 'react-icons/lib/md/today';
import Apps from 'react-icons/lib/md/apps';
import Label from 'react-icons/lib/md/label';
import List from 'preact-material-components/List';
import { Link } from './Match';
import LinkListItem from './LinkListItem';

export const navItems = [{
  href: '/all',
  text: 'All',
  icon: Apps,
}, {
  href: '/inbox',
  text: 'Inbox',
  icon: InboxIcon,
}, {
  href: '/projects',
  text: 'Projects',
  icon: Assignment,
}, {
  href: '/tags',
  text: 'Tags',
  icon: Label,
}, {
  href: '/today',
  text: 'Today',
  icon: Today,
}, {
  href: '/tomorrow',
  text: 'Tomorrow',
  icon: Today,
}, {
  href: '/overdue',
  text: 'Overdue',
  icon: Today,
}, {
  href: '/week',
  text: 'Next 7 Days',
  icon: Today,
}, {
  href: '/account',
  text: 'Account',
  icon: Person,
}];

const NavItems = ({ activeClassName }) => (<List>
  {navItems.map(Item => (
    <LinkListItem Component={Link} href={Item.href} activeClassName={activeClassName}>
      <Item.icon className="mdc-list-item__start-detail" />
      {Item.text}
    </LinkListItem>
  ))}
</List>);

export default NavItems;
