import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../utils/mapDispatchToProps';
import Projects from './Projects';
import OakPropTypes from '../PropTypes';

export const Project = props => (
  <Projects
    onCreateProject={project => props.createProject(props.routeParams.projectId, project)}
    onCreateTask={task => props.createTask(props.routeParams.projectId, task)}
    onDelete={(index) => {
      const item = props.project[index];
      if (item.isProject) props.deleteProject(props.routeParams.projectId, item._id);
      else props.deleteTask(props.routeParams.projectId, item._id);
    }}
    onAvatarTap={(index) => {
      if (!props.project[index].isProject) {
        props.completeTask(props.project[index]._id, !props.project[index].isCompleted);
      }
    }}
    onItemTap={(i) => {
      if (props.project[i].isProject) {
        props.router.push(`/project/${props.project[i]._id}`);
      }
    }}
    projectChildren={props.project}
  />
);
Project.propTypes = {
  project: React.PropTypes.arrayOf(OakPropTypes.item),
  createProject: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  createTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  deleteTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  completeTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  routeParams: React.PropTypes.shape({
    projectId: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  }),
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};
function mapStateToProps(state, ownProps) {
  const project = state.items.find(item => item._id === ownProps.routeParams.projectId);
  if (project === undefined) return { project: [] };
  const projectChildren = project.children.map(id =>
    state.items.find(item => item._id === id));
  return { project: projectChildren };
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
