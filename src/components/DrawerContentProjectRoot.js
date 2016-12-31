import React from 'react';
import { ListItem } from 'material-ui/List';
import { graphql } from 'react-apollo';
import drawerProjectsRootQuery from '../graphql/drawerProjectsRoot.gql';
import { renderChildren } from './DrawerContentProject';
import OakPropTypes from '../PropTypes';

const DrawerContentProjectRoot = props => (
  <ListItem nestedItems={props.data.root ? renderChildren(props.data.root, props.onLocationTap) : []} onTouchTap={() => props.onLocationTap('/projects')}>Me</ListItem>
);

DrawerContentProjectRoot.propTypes = {
  onLocationTap: React.PropTypes.func,
  data: React.PropTypes.shape({
    root: React.PropTypes.arrayOf(OakPropTypes.item),
  }),
};

export default graphql(drawerProjectsRootQuery)(DrawerContentProjectRoot);
