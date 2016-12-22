import React from 'react';
import { graphql, compose } from 'react-apollo';
import Projects from './Projects';
import OakPropTypes from '../PropTypes';
import projectById from '../graphql/projectById.gql';
import addProjectMutation from '../graphql/addProject.gql';

export const Project = props => (
  <Projects
    onCreateProject={props.createProject}
    onCreateTask={props.createTask}
    onItemTap={i => props.router.push(`/project/${props.data.itemById.children[i].id}`)}
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
              ItemById(prev, { mutationResult }) {
                return {
                  ...prev,
                  itemById: [
                    ...prev.itemById,
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
)(Project);
