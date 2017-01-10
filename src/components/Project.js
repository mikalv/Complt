import React from 'react';
import Projects from './Projects';
import OakPropTypes from '../PropTypes';

export const Project = props => (
  <Projects
    onCreateProject={props.createProject}
    onCreateTask={props.createTask}
    onDelete={(index) => {
      const item = props.data.itemById.children[index];
      if (item.__typename === 'Task') props.deleteTask(item.id);
      if (item.__typename === 'Project') props.deleteProject(item.id);
    }}
    onAvatarTap={(index) => {
      if (props.data.itemById.children[index].__typename === 'Task') {
        props.completeTask(props.data.itemById.children[index].id,
          !props.data.itemById.children[index].isCompleted);
      }
    }}
    onItemTap={(i) => {
      if (props.data.itemById.children[i].__typename === 'Project') {
        props.router.push(`/project/${props.data.itemById.children[i].id}`);
      }
    }}
    projectChildren={props.data.loading ? [] : props.data.itemById.children}
    loading={props.data.loading}
  />
);
Project.propTypes = {
  data: React.PropTypes.shape({
    itemById: React.PropTypes.shape({
      children: React.PropTypes.arrayOf(OakPropTypes.item),
    }),
    loading: React.PropTypes.bool,
  }),
  createProject: React.PropTypes.func,
  createTask: React.PropTypes.func,
  deleteTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  completeTask: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  routeParams: React.PropTypes.shape({
    projectId: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  }),
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};
export default Project;
