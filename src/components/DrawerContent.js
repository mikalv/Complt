import React from 'react';
import { ListItem, List } from 'material-ui/List';
import ActionHome from 'material-ui/svg-icons/action/home';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionLabel from 'material-ui/svg-icons/action/label';

const DrawerContent = () => (
  <List>
    <ListItem leftIcon={<ActionHome />}>Home</ListItem>
    <ListItem leftIcon={<ContentInbox />}>Inbox</ListItem>
    <ListItem leftIcon={<ActionLabel />}>Contexts</ListItem>
  </List>
);

export default DrawerContent;
