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
RootProject.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

export default RootProject;
