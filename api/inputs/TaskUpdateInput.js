import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

const TaskUpdateInput = new GraphQLInputObjectType({
  name: 'TaskUpdateInput',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
    tags: { type: new GraphQLList(GraphQLString) },
  }),
});

export default TaskUpdateInput;
