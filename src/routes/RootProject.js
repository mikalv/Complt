import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../utils/mapDispatchToProps';
import Projects from '../components/Projects';
import OakPropTypes from '../PropTypes';

export const RootProject = props => (
  <Projects
    onCreateProject={project => props.createProject('root', project)}
    onCreateTask={task => props.createTask('root', task)}
    onDelete={(index) => {
      const item = props.root[index];
      if (item.isProject) props.deleteProject('root', item._id);
      else props.deleteTask('root', item._id);
    }}
    onAvatarTap={(index) => {
      if (!props.root[index].isProject) {
        props.completeTask(props.root[index]._id, !props.root[index].isCompleted);
      }
    }}
    onItemTap={(i) => {
      if (props.root[i].isProject) {
        props.router.push(`/project/${props.root[i]._id}`);
      }
    }}
    projectChildren={props.root}
  />
);
RootProject.propTypes = {
  root: React.PropTypes.arrayOf(OakPropTypes.item),
  createProject: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  createTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  deleteTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  deleteProject: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  completeTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

function mapStateToProps(state) {
  const rootProject = state.items.find(item => item._id === 'root');
  if (rootProject === undefined) return { root: [] };
  const rootChildren = rootProject.children.map(id => state.items.find(item => item._id === id));
  return { root: rootChildren };
}

export default connect(mapStateToProps, mapDispatchToProps)(RootProject);
