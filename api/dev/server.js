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
  },
}));

app.listen(PORT, () => {
  console.log(`GraphQL server started at http://localhost:${PORT}/graphql`); // eslint-disable-line no-console
});
