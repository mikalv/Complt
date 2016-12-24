import React from 'react';
import { graphql, compose } from 'react-apollo';
import Projects from './Projects';
import OakPropTypes from '../PropTypes';
import projectById from '../graphql/projectById.gql';
import addProjectMutation from '../graphql/addProject.gql';
import completeTaskMutation from '../graphql/completeTask.gql';
import addTaskMutation from '../graphql/addTask.gql';

export const Project = props => (
  <Projects
    onCreateProject={props.createProject}
    onCreateTask={props.createTask}
    onAvatarTap={(index) => {
      if (props.data.root[index].__typename === 'Task') {
        props.completeTask(props.data.root[index].id, !props.data.root[index].isCompleted);
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
