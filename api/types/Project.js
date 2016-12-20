import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import Item from './Item';
import getItemsByUserAndIds from '../lib/getItemsByUserAndIds';

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
        resolve(obj) {
          if (obj.projectType === 'seq') {
            return true;
          }
          if (obj.projectType === 'para') {
            return false;
          }
          return null;
        },
      },
      children: {
        type: new GraphQLList(Item),
        resolve(obj) {
          if (!obj.children) return [];
          return getItemsByUserAndIds('mitchell', obj.children);
        },
      },
    };
  },
});

export default Project;
