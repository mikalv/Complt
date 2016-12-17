import getItemsByUserAndIds from '../getItemsByUserAndIds';
import { Item } from '../../dynamoModels';

jest.mock('../../dynamoModels');

Item.getItemsAsync.mockImplementation(items =>
Promise.resolve(items.map(item => ({ attrs: item }))));

describe('getItemsByUserAndIds()', () => {
  it('resolves with an array of items if it passed a userId and an array of itemIds', () =>
    getItemsByUserAndIds('someUserId', ['someItemId']).then(thing => expect(thing).toEqual([{ id: 'someItemId', owner: 'someUserId' }]))
  );
  it('rejects if it is called with no arguments', () =>
    getItemsByUserAndIds().catch(error => expect(error).toEqual('No user id or no item ids were given'))
  );
  it('rejects if it is called with falsy arguments', () =>
    getItemsByUserAndIds('', []).catch(error => expect(error).toEqual('No user id or no item ids were given'))
  );
  it('calls Item.getItemsAsync once with the correct arguments', () =>
    getItemsByUserAndIds('someUserId', ['someItemId']).then(() => {
      expect(Item.getItemsAsync).toBeCalledWith([{ owner: 'someUserId', id: 'someItemId' }]);
    })
  );
});
