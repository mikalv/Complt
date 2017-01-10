import React from 'react';
import Projects from './Projects';
import OakPropTypes from '../PropTypes';

export const RootProject = props => (
  <Projects
    onCreateProject={props.createProject}
    onCreateTask={props.createTask}
    onDelete={(index) => {
      const item = props.data.root[index];
      if (item.__typename === 'Task') props.deleteTask(item.id);
      if (item.__typename === 'Project') props.deleteProject(item.id);
    }}
    onAvatarTap={(index) => {
      if (props.data.root[index].__typename === 'Task') {
        props.completeTask(props.data.root[index].id, !props.data.root[index].isCompleted);
      }
    }}
    onItemTap={(i) => {
      if (props.data.root[i].__typename === 'Project') {
        props.router.push(`/project/${props.data.root[i].id}`);
      }
    }}
    projectChildren={props.data.root}
    loading={props.data.loading}
  />
);
RootProject.propTypes = {
  data: React.PropTypes.shape({
    root: React.PropTypes.arrayOf(OakPropTypes.item),
    loading: React.PropTypes.bool,
  }),
  createProject: React.PropTypes.func,
  createTask: React.PropTypes.func,
  deleteTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  completeTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};
export default RootProject;
