import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType,
  GraphQLList,
} from 'graphql';
import Item from './Item';
import getItemsByUserAndIds from '../../lib/getItemsByUserAndIds';

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
      projectType: {
        type: new GraphQLEnumType({
          values: {
            para: { value: 'para' },
            seq: { value: 'seq' },
          },
        }),
      },
      children: {
        type: new GraphQLList(Item),
        resolve(obj) {
          return getItemsByUserAndIds('mitchell', obj.children);
        },
      },
    };
  },
});

export default Project;
