import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import Item from './Item';
import { projectIsSequentialResolver, projectChildrenResolver } from './resolvers';

const Project = new GraphQLObjectType({
  name: 'Project',
  description: 'A project that can contain tasks or other projects',
  fields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      name: {
        type: GraphQLString,
      },
      isSequential: {
        type: GraphQLBoolean,
        resolve: projectIsSequentialResolver,
      },
      children: {
        type: new GraphQLList(Item),
        resolve: projectChildrenResolver,
      },
    };
  },
});

export default Project;
