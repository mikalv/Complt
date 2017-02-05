import React from 'react';
import ProjectView from '../components/ProjectView';
import DrawerIcon from '../components/DrawerIcon';

const Inbox = () => <ProjectView projectId="inbox" />;

const InboxDrawerIcon = DrawerIcon('inbox');

Inbox.navigationOptions = {
  title: 'Inbox',
  drawer: () => ({
    label: 'Inbox',
    icon: InboxDrawerIcon,
  }),
};

export default Inbox;
