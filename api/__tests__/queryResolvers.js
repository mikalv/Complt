import { queryItemByIdResolver, queryInboxResolver, queryRootResolver, queryUserResolver } from '../resolvers';
import getItemsByUserAndIds from '../lib/getItemsByUserAndIds';
import verifyItemExists from '../lib/verifyItemExists';

jest.mock('../lib/getItemsByUserAndIds').mock('../lib/verifyItemExists');

getItemsByUserAndIds.mockImplementation((user, ids) =>
  Promise.resolve(ids.map(id => ({ owner: user, id })))
);
verifyItemExists.mockImplementation((user, id) => Promise.resolve(({ owner: user, id, children: ['someOtherId'] })));

describe('queryItemByIdResolver()', () => {
  it('returns an error when requesting the inbox project', () => {
    expect(queryItemByIdResolver({ userId: 'someUserId' }, { id: 'inbox' }))
    .toEqual(new Error('Please do not request the inbox project from this field'));
  });
  it('returns an error when requesting the root project', () => {
    expect(queryItemByIdResolver({ userId: 'someUserId' }, { id: 'root' }))
    .toEqual(new Error('Please do not request the root project from this field'));
  });
  it('resolves to the item requested and calls getItemsByUserAndIds correctly', () =>
    queryItemByIdResolver({ userId: 'someUserId' }, { id: 'someItemId' }).then((item) => {
      expect(item).toEqual({ owner: 'someUserId', id: 'someItemId' });
      expect(getItemsByUserAndIds).toBeCalledWith('someUserId', ['someItemId']);
    })
  );
});

describe('queryInboxResolver()', () => {
  it('calls verifyItemExists correctly', () =>
    queryInboxResolver({ userId: 'someUserId' }).then(() => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'inbox');
    })
  );
  it('calls getItemsByUserAndIds correctly', () =>
    queryInboxResolver({ userId: 'someUserId' }).then(() => {
      expect(getItemsByUserAndIds).toBeCalledWith('someUserId', ['someOtherId']);
    })
  );
  it('resolves to the correct items', () =>
    queryInboxResolver({ userId: 'someUserId' }).then((items) => {
      expect(items).toEqual([{ owner: 'someUserId', id: 'someOtherId' }]);
    })
  );
});
describe('queryRootResolver()', () => {
  it('calls verifyItemExists correctly', () =>
    queryRootResolver({ userId: 'someUserId' }).then(() => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'root');
    })
  );
  it('calls getItemsByUserAndIds correctly', () =>
    queryRootResolver({ userId: 'someUserId' }).then(() => {
      expect(getItemsByUserAndIds).toBeCalledWith('someUserId', ['someOtherId']);
    })
  );
  it('resolves to the correct items', () =>
    queryRootResolver({ userId: 'someUserId' }).then((items) => {
      expect(items).toEqual([{ owner: 'someUserId', id: 'someOtherId' }]);
    })
  );
});
describe('queryUserResolver()', () => {
  it('returns the user object from the root value', () => {
    expect(queryUserResolver({ user: { userId: 'someUserId' } })).toEqual({ userId: 'someUserId' });
  });
});
