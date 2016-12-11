import React from 'react';
import { ListItem, List } from 'material-ui/List';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionLabel from 'material-ui/svg-icons/action/label';

const DrawerContent = ({ onLocationTap }) => (
  <List>
    <ListItem onTouchTap={() => onLocationTap('/')} leftIcon={<ActionHome />}>Home</ListItem>
    <ListItem onTouchTap={() => onLocationTap('/account')} leftIcon={<SocialPerson />}>Account</ListItem>
    <ListItem onTouchTap={() => onLocationTap('/inbox')} leftIcon={<ContentInbox />}>Inbox</ListItem>
    <ListItem leftIcon={<ActionLabel />}>Tags</ListItem>
  </List>
);

DrawerContent.propTypes = {
  onLocationTap: React.PropTypes.func,
};

export default DrawerContent;
