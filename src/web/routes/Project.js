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
Project.propTypes = {
  match: React.PropTypes.shape({
    params: React.PropTypes.shape({
      projectId: React.PropTypes.string,
    }),
  }),
  history: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

export default Project;
