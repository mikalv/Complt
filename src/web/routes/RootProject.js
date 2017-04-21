import React from 'react';
import Projects from '../components/Projects';

const RootProject = props => (
  <Projects
    initialIsProject
    canChangeType
    projectId="root"
    routerPush={props.history.push}
  />
);

export default RootProject;
