import { graphql } from 'graphql';
import schema from './src/graphql/schema';
import getUserId from './src/auth';

module.exports.graphql = (event, context, callback) => {
  getUserId(event.headers.Authorization).then((user) => {
    if (user === 'Unauthorized') {
      const response = {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: 'Unauthorized',
      };
      callback(null, response);
    } else {
      graphql(schema, event.body, { userId: user.user_id }).then((result) => {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(result),
        };
        callback(null, response);
      });
    }
  });
};
