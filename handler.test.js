import { graphql } from 'graphql';
import { graphql as handler } from './handler';
import getUserId from './api/auth';
import schema from './api/schema';

jest.mock('./api/auth').mock('graphql').mock('./api/schema');

graphql.mockImplementation(() => Promise.resolve({ data: { someData: 'something' } }));

describe('Serverless handler', () => {
  it('calls getUserId correctly', (cb) => {
    getUserId.mockReturnValueOnce(Promise.reject());
    handler({ headers: { Authorization: 'Bearer dsfsdf.sdfsds.df' } }, undefined, () => {
      expect(getUserId).toBeCalledWith('Bearer dsfsdf.sdfsds.df');
      cb();
    });
  });
  it('calls the callback correctly if getUserId rejects', (cb) => {
    getUserId.mockReturnValueOnce(Promise.reject());
    handler({ headers: { Authorization: 'Bearer dsfsdf.sdfsds.df' } }, undefined, (err, response) => {
      expect(response).toEqual({
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: 'Unauthorized',
      });
      cb();
    });
  });
  it('calls graphql correctly', (cb) => {
    getUserId.mockReturnValueOnce(Promise.resolve({ user_id: 'someUserId' }));
    handler({ headers: { Authorization: 'Bearer dsfsdf.sdfsds.df' }, body: '{"query":"query Inbox { inbox { id name } }","operationName":"Inbox","variables":{"variable1":"someUselessThing"}}' }, undefined, () => {
      expect(graphql).toBeCalledWith(schema,
        'query Inbox { inbox { id name } }',
        { userId: 'someUserId', user: { user_id: 'someUserId' } },
        undefined, { variable1: 'someUselessThing' },
        'Inbox');
      cb();
    });
  });
  it('calls the callback correctly if getUserIdResolves', (cb) => {
    getUserId.mockReturnValueOnce(Promise.resolve({ user_id: 'someUserId' }));
    handler({ headers: { Authorization: 'Bearer dsfsdf.sdfsds.df' }, body: '{"query":"query Inbox { inbox { id name } }","operationName":"Inbox","variables":{"variable1":"someUselessThing"}}' }, undefined, (err, response) => {
      expect(response).toEqual({ body: '{"data":{"someData":"something"}}', headers: { 'Access-Control-Allow-Origin': '*' }, statusCode: 200 });
      cb();
    });
  });
});
