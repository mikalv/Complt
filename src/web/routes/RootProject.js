import React from 'react';
import Projects from '../components/Projects';

const RootProject = props => (
  <Projects
    initialIsProject
    canChangeType
    canMove
    canDeleteTask
    canDeleteProject
    projectId="root"
    routerPush={props.router.push}
  />
);
RootProject.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

export default RootProject;
