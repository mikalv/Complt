import React from 'react';
import { graphql, compose } from 'react-apollo';
import CircularProgress from 'material-ui/CircularProgress';
import ItemList from './ItemList';
import AddItem from './AddItem';
import OakPropTypes from '../PropTypes';
import rootItemsQuery from '../graphql/rootItems.gql';
import addProjectMutation from '../graphql/addProject.gql';

export const Projects = props => (
  <div>
    {props.data.loading ? <div className="flex center row">
      <CircularProgress className="loading-padding" />
    </div> : <div>
      <ItemList
        items={props.data.root || []}
        style={{ marginBottom: '116px', height: '100%' }}
      />
    </div>}
    <div className="AddItem-fixed">
      <AddItem
        initialType="Project"
        onAddItem={(item) => {
          if (item.__typename === 'Project') props.createProject(item.name);
          else props.createTask(item);
        }}
      />
    </div>
  </div>
);
Projects.propTypes = {
  data: React.PropTypes.shape({
    root: React.PropTypes.arrayOf(OakPropTypes.item),
    loading: React.PropTypes.bool,
  }),
  createProject: React.PropTypes.func,
  createTask: React.PropTypes.func,
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
)(Projects);
