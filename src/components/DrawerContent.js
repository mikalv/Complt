import React from 'react';
import { ListItem, List } from 'material-ui/List';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionLabel from 'material-ui/svg-icons/action/label';

const DrawerContent = ({ onLocationTap }, { router }) => (
  <List>
    <ListItem onTouchTap={() => { router.push('/'); onLocationTap(); }} leftIcon={<ActionHome />}>Home</ListItem>
    <ListItem onTouchTap={() => { router.push('/account'); onLocationTap(); }} leftIcon={<SocialPerson />}>Account</ListItem>
    <ListItem onTouchTap={() => { router.push('/inbox'); onLocationTap(); }} leftIcon={<ContentInbox />}>Inbox</ListItem>
    <ListItem leftIcon={<ActionLabel />}>Contexts</ListItem>
  </List>
);

DrawerContent.contextTypes = {
  router: React.PropTypes.object,
};

DrawerContent.propTypes = {
  onLocationTap: React.PropTypes.func,
};

export default DrawerContent;
