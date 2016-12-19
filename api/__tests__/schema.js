import { printSchema } from 'graphql';
import schema from '../schema';
import '../../handler';

describe('GraphQL schema', () => {
  it('matches the snapshot', () => {
    expect(printSchema(schema)).toMatchSnapshot();
  });
});
