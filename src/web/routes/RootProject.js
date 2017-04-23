import React from 'react';
import { route } from 'preact-router';
import Projects from '../components/Projects';

const RootProject = () => (
  <Projects
    initialIsProject
    canChangeType
    projectId="root"
    routerPush={route}
  />
);

export default RootProject;
