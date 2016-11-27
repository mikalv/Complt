import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

const TaskInput = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    isCompleted: { type: new GraphQLNonNull(GraphQLBoolean) },
    contexts: { type: new GraphQLList(GraphQLString) },
  }),
});

export default TaskInput;
