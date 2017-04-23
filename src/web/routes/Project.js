import React from 'react';
import { route } from 'preact-router';
import Projects from '../components/Projects';

const Project = props => (
  <Projects
    initialIsProject
    canChangeType
    projectId={props.projectId}
    routerPush={route}
  />
);

export default Project;
