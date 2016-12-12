import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'The data of the user who is performing the request',
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    picture: { type: GraphQLString },
  }),
});

export default User;
