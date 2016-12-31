import React from 'react';
import { ListItem } from 'material-ui/List';
import { graphql } from 'react-apollo';
import drawerProjectQuery from '../graphql/drawerProject.gql';
import OakPropTypes from '../PropTypes';

export function renderChildren(children = [], onLocationTap) {
  return children.map(({ id, name, __typename }, i) => {
    if (__typename === 'Project') return <DrawerContentProjectWithGraphQL key={i} name={name} id={id} onLocationTap={onLocationTap} />;
    return '';
  });
}

const DrawerContentProject = graphql(drawerProjectQuery, {
  options: ({ id }) => ({ variables: id }) })(props => (
    <ListItem nestedItems={props.data ? renderChildren(props.data.itemById.children, props.onLocationTap) : []} onTouchTap={() => props.onLocationTap(`/project/${props.id}`)}>{props.name}</ListItem>
));

DrawerContentProject.propTypes = {
  onLocationTap: React.PropTypes.func,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  data: React.PropTypes.shape({
    itemById: { children: React.PropTypes.arrayOf(OakPropTypes.item) },
  }),
};

const DrawerContentProjectWithGraphQL = graphql(drawerProjectQuery, {
  options: ({ id }) => ({ variables: id }) })(DrawerContentProject);


export default DrawerContentProjectWithGraphQL;
