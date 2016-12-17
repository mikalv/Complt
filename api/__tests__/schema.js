import schema from '../schema';
import '../auth';
import '../../handler';

// Currently this test is only here so all code is included in coverage reports
describe('GraphQL schema', () => {
  it('is an object', () => {
    expect(typeof schema).toEqual('object');
  });
});
