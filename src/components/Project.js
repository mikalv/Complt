import React from 'react';
import { graphql, compose } from 'react-apollo';
import Projects from './Projects';
import OakPropTypes from '../PropTypes';
import projectById from '../graphql/projectById.gql';
import addProjectMutation from '../graphql/addProject.gql';
import GraphQLCompleteTask from '../graphql/completeTask';
import addTaskMutation from '../graphql/addTask.gql';
import deleteTaskMutation from '../graphql/deleteTask.gql';
import deleteProjectMutation from '../graphql/deleteProject.gql';

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
export default compose(
  graphql(projectById, {
    options: ({ routeParams }) => ({ variables: { id: routeParams.projectId } }),
  }),
  graphql(deleteProjectMutation, {
    props({ mutate, ownProps }) {
      return {
        deleteProject(projectId) {
          mutate({
            variables: {
              parentProjectId: ownProps.routeParams.projectId,
              projectId,
            },
            updateQueries: {
              ProjectById(prev) {
                const projectIndex = prev.itemById.children.findIndex(item =>
                  item.id === projectId);
                return {
                  ...prev,
                  itemById: {
                    ...prev.itemById,
                    children: [
                      ...prev.itemById.children.slice(0, projectIndex),
                      ...prev.itemById.children.slice(projectIndex + 1),
                    ],
                  },
                };
              },
            },
          });
        },
      };
    },
  }),
  graphql(deleteTaskMutation, {
    props({ mutate, ownProps }) {
      return {
        deleteTask(taskId) {
          mutate({
            variables: {
              parentProjectId: ownProps.routeParams.projectId,
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
              ProjectById(prev) {
                const taskIndex = prev.itemById.children.findIndex(item => item.id === taskId);
                return {
                  ...prev,
                  itemById: {
                    ...prev.itemById,
                    children: [
                      ...prev.itemById.children.slice(0, taskIndex),
                      ...prev.itemById.children.slice(taskIndex + 1),
                    ],
                  },
                };
              },
            },
          });
        },
      };
    },
  }),
  GraphQLCompleteTask,
  graphql(addTaskMutation, {
    props({ mutate, ownProps }) {
      return {
        createTask(task) {
          mutate({
            variables: {
              task: {
                name: task.name,
                isCompleted: task.isCompleted || false,
                tags: task.tags || [],
              },
              projectId: ownProps.routeParams.projectId,
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
              ProjectById(prev, { mutationResult }) {
                return {
                  itemById: {
                    ...prev.itemById,
                    children: [
                      ...prev.itemById.children,
                      mutationResult.data.createTask,
                    ],
                  },
                };
              },
            },
          });
        },
      };
    },
  }),
  graphql(addProjectMutation, {
    props({ mutate, ownProps }) {
      return {
        createProject(name) {
          mutate({
            variables: {
              project: {
                name,
                isSequential: false,
              },
              projectId: ownProps.routeParams.projectId,
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
              ProjectById(prev, { mutationResult }) {
                return {
                  itemById: {
                    ...prev.itemById,
                    children: [
                      ...prev.itemById.children,
                      mutationResult.data.createProject,
                    ],
                  },
                };
              },
            },
          });
        },
      };
    },
  }),
)(Project);
