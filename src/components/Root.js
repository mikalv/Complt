import React from 'react';
import { graphql, compose } from 'react-apollo';
import Projects from './Projects';
import OakPropTypes from '../PropTypes';
import rootItemsQuery from '../graphql/rootItems.gql';
import addProjectMutation from '../graphql/addProject.gql';

export const Root = props => (
  <Projects
    onCreateProject={props.createProject}
    onCreateTask={props.createTask}
    onItemTap={i => props.router.push(`/project/${props.data.root[i].id}`)}
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
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};
export default compose(
  graphql(rootItemsQuery),
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
