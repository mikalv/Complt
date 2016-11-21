import { GraphQLUnionType } from 'graphql';
import Task from './Task';
import Project from './Project';

const Item = new GraphQLUnionType({
  name: 'Item',
  types: [Task, Project],
  resolveType(value) {
    if (value.isProject) {
      return Project;
    }
    return Task;
  },
});

export default Item;
