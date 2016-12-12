import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../schema';

const app = express();
const PORT = 8080;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: {
    userId: 'testUserId',
    user: {
      name: 'Example Person',
      email: 'person@example.com',
      picture: 'http://gravatar.com/someperson',
    },
  },
}));

app.listen(PORT, () => {
  console.log(`GraphQL server started at http://localhost:${PORT}/graphql`); // eslint-disable-line no-console
});
