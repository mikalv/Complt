import React from 'react';
import Projects from '../components/Projects';

const Project = props => (
  <Projects
    initialIsProject
    canChangeType
    projectId={props.routeParams.projectId}
    routerPush={props.router.push}
  />
);
Project.propTypes = {
  routeParams: React.PropTypes.shape({
    projectId: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  }),
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

export default Project;
