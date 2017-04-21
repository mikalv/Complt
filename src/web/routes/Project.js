import React from 'react';
import Projects from '../components/Projects';

const Project = props => (
  <Projects
    initialIsProject
    canChangeType
    projectId={props.match.params.projectId}
    routerPush={props.history.push}
  />
);

export default Project;
