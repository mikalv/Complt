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
    tags: { type: new GraphQLList(GraphQLString) },
  }),
});

export default TaskInput;
