import verifyItemExists from '../verifyItemExists';
import { Item, Inbox, Root } from '../../dynamoModels';

jest.mock('../../dynamoModels');

Item.getAsync.mockImplementation(() => Promise.resolve(null))
.mockImplementationOnce(item => Promise.resolve({ attrs: item }));
Inbox.createAsync.mockImplementation(inboxCreated => Promise.resolve({ attrs: { ...inboxCreated, id: 'inbox' } }));
Root.createAsync.mockImplementation(rootCreated => Promise.resolve({ attrs: { ...rootCreated, id: 'root' } }));

describe('verifyItemExists()', () => {
  it('resolves with the item if it exists', () =>
    verifyItemExists('someUserId', 'someItemId').then((item) => {
      expect(item).toEqual({ owner: 'someUserId', id: 'someItemId' });
    })
  );
  it('rejects if it is called with no arguments', () =>
    verifyItemExists().catch((error) => {
      expect(error).toEqual('No user id or no item id was given');
    })
  );
  it('calls Item.getAsync with the correct data', () =>
    verifyItemExists('someUserId', 'someItemId').catch(() => {
      expect(Item.getAsync).toBeCalledWith({ owner: 'someUserId', id: 'someItemId' });
    })
  );
  it('rejects if the item does not exist and is not inbox or root', () =>
    verifyItemExists('someUserId', 'someItemId').catch((error) => {
      expect(error).toEqual('Item does not exist');
    })
  );
  it('creates an inbox item if it does not exist and resolves with it', () =>
    verifyItemExists('someUserId', 'inbox').then((inboxCreated) => {
      expect(Inbox.createAsync).toBeCalledWith({ owner: 'someUserId' });
      expect(inboxCreated).toEqual({ owner: 'someUserId', id: 'inbox' });
    })
  );
  it('creates a root item if it does not exist and resolves with it', () =>
    verifyItemExists('someUserId', 'root').then((rootCreated) => {
      expect(Root.createAsync).toBeCalledWith({ owner: 'someUserId' });
      expect(rootCreated).toEqual({ owner: 'someUserId', id: 'root' });
    })
  );
});
