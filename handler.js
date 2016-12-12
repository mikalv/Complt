import { graphql } from 'graphql';
import schema from './api/schema';
import getUserId from './api/auth';

module.exports.graphql = (event, context, callback) => {
  getUserId(event.headers.Authorization).then((user) => {
    if (user === 'Unauthorized' || user === 'Not enough or too many segments') {
      const response = {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: 'Unauthorized',
      };
      callback(null, response);
    } else {
      const body = JSON.parse(event.body);
      graphql(schema, body.query, { userId: user.user_id, user }, undefined, body.variables,
        body.operationName).then((result) => {
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
