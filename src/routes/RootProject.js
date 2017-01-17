import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../utils/mapDispatchToProps';
import Projects from '../components/Projects';

export const RootProject = props => (
  <Projects
    initialIsProject
    canChangeType
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
