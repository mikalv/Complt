import { GraphQLUnionType } from 'graphql';
import Task from './Task';
import Project from './Project';
import { itemTypeResolver } from './resolvers';

const Item = new GraphQLUnionType({
  name: 'Item',
  types: [Task, Project],
  resolveType: itemTypeResolver,
});

export default Item;
