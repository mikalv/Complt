import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

const Task = new GraphQLObjectType({
  name: 'Task',
  description: 'A task',
  fields() {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      isCompleted: { type: GraphQLBoolean },
      tags: {
        type: new GraphQLList(GraphQLString),
        resolve(obj) {
          return obj.tags || [];
        },
      },
    };
  },
});

export default Task;