import React from 'react';
import { graphql, compose } from 'react-apollo';
import Projects from './Projects';
import OakPropTypes from '../PropTypes';
import rootItemsQuery from '../graphql/rootItems.gql';
import addProjectMutation from '../graphql/addProject.gql';
import completeTaskMutation from '../graphql/completeTask.gql';
import addTaskMutation from '../graphql/addTask.gql';
import deleteTaskMutation from '../graphql/deleteTask.gql';
import deleteProjectMutation from '../graphql/deleteProject.gql';

export const Root = props => (
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
Root.propTypes = {
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
export default compose(
  graphql(rootItemsQuery),
  graphql(deleteProjectMutation, {
    props({ mutate }) {
      return {
        deleteProject(projectId) {
          mutate({
            variables: {
              parentProjectId: 'root',
              projectId,
            },
            updateQueries: {
              Root(prev) {
                const projectIndex = prev.root.findIndex(item => item.id === projectId);
                return {
                  ...prev,
                  root: [
                    ...prev.root.slice(0, projectIndex),
                    ...prev.root.slice(projectIndex + 1),
                  ],
                };
              },
            },
          });
        },
      };
    },
  }),
  graphql(deleteTaskMutation, {
    props({ mutate }) {
      return {
        deleteTask(taskId) {
          mutate({
            variables: {
              parentProjectId: 'root',
              taskId,
            },
            optimisticResponse: {
              __typename: 'Mutation',
              deleteTask: {
                id: taskId,
                __typename: 'Task',
              },
            },
            updateQueries: {
              Root(prev) {
                const taskIndex = prev.root.findIndex(item => item.id === taskId);
                return {
                  ...prev,
                  root: [
                    ...prev.root.slice(0, taskIndex),
                    ...prev.root.slice(taskIndex + 1),
                  ],
                };
              },
            },
          });
        },
      };
    },
  }),
  graphql(completeTaskMutation, {
    props({ mutate }) {
      return {
        completeTask(id, isCompleted) {
          mutate({
            variables: {
              input: {
                id,
                isCompleted,
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              taskUpdate: {
                id,
                isCompleted,
                __typename: 'Task',
              },
            },
          });
        },
      };
    },
  }),
  graphql(addTaskMutation, {
    props({ mutate }) {
      return {
        createTask(task) {
          mutate({
            variables: {
              task: {
                name: task.name,
                isCompleted: task.isCompleted || false,
                tags: task.tags || [],
              },
              projectId: 'root',
            },
            optimisticResponse: {
              __typename: 'Mutation',
              createTask: {
                id: task.name + new Date().toString(),
                name: task.name,
                isCompleted: task.isCompleted || false,
                tags: task.tags || [],
                isOptimistic: true,
                __typename: 'Task',
              },
            },
            updateQueries: {
              Root(prev, { mutationResult }) {
                return {
                  ...prev,
                  root: [
                    ...prev.root,
                    mutationResult.data.createTask,
                  ],
                };
              },
            },
          });
        },
      };
    },
  }),
  graphql(addProjectMutation, {
    props({ mutate }) {
      return {
        createProject(name) {
          mutate({
            variables: {
              project: {
                name,
                isSequential: false,
              },
              projectId: 'root',
            },
            optimisticResponse: {
              __typename: 'Mutation',
              createProject: {
                id: name + new Date().toString(),
                name,
                isSequential: false,
                __typename: 'Project',
              },
            },
            updateQueries: {
              Root(prev, { mutationResult }) {
                return {
                  ...prev,
                  root: [
                    ...prev.root,
                    mutationResult.data.createProject,
                  ],
                };
              },
            },
          });
        },
      };
    },
  }),
)(Root);
