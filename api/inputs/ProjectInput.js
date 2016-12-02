import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

const ProjectInput = new GraphQLInputObjectType({
  name: 'ProjectInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    isSequential: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

export default ProjectInput;
