import React from 'react';
import ProjectView from '../components/ProjectView';
import DrawerIcon from '../components/DrawerIcon';

const RootProject = () => <ProjectView initialIsProject canChangeType projectId="root" />;

const RootProjectDrawerIcon = DrawerIcon('assignment');

RootProject.navigationOptions = {
  title: 'Projects',
  drawer: () => ({
    label: 'Projects',
    icon: RootProjectDrawerIcon,
  }),
};

export default RootProject;
