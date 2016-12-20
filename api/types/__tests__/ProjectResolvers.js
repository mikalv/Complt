import { projectChildrenResolver, projectIsSequentialResolver } from '../resolvers';
import getItemsByUserAndIds from '../../lib/getItemsByUserAndIds';

jest.mock('../../lib/getItemsByUserAndIds');

describe('projectIsSequentialResolver()', () => {
  it('returns true if obj.projectType === seq', () => {
    expect(projectIsSequentialResolver({ projectType: 'seq' })).toEqual(true);
  });
  it('returns false if obj.projectType === para', () => {
    expect(projectIsSequentialResolver({ projectType: 'para' })).toEqual(false);
  });
  it('returns null if no arguments are passed', () => {
    expect(projectIsSequentialResolver()).toEqual(null);
  });
  it('returns null if obj.projectType does not exist or is not para or seq', () => {
    expect(projectIsSequentialResolver({})).toEqual(null);
  });
});

describe('projectChildrenResolver()', () => {
  it('returns an empty array if the object has no children', () => {
    expect(projectChildrenResolver({})).toEqual([]);
  });
  it('calls and returns the value of getItemsByUserAndIds()', () => {
    getItemsByUserAndIds.mockImplementation((user, ids) => ids.map(id => ({ owner: user, id })));
    expect(projectChildrenResolver({ owner: 'someUserId', children: ['someId', 'someOtherId'] })).toEqual([{
      owner: 'someUserId',
      id: 'someId',
    }, {
      owner: 'someUserId',
      id: 'someOtherId',
    }]);
    expect(getItemsByUserAndIds).toBeCalledWith('someUserId', ['someId', 'someOtherId']);
  });
});
