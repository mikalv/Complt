import addItemToProject from '../addItemToProject';
import { Item } from '../../dynamoModels';
import verifyItemExists from '../verifyItemExists';

jest.mock('../../dynamoModels').mock('../verifyItemExists');

Item.createAsync.mockImplementation(item =>
  Promise.resolve({ attrs: { ...item, id: 'someItemId' } }));
Item.updateAsync.mockImplementation(item =>
  Promise.resolve({ attrs: item }));
verifyItemExists.mockImplementation((user, id) => {
  if (id === 'someProjectWithoutChildren') return Promise.resolve({ owner: user, id });
  return Promise.resolve({ owner: user, id, children: [] });
});

describe('addItemToProject()', () => {
  it('rejects if it is called with no arguments', () =>
    addItemToProject().catch(error => expect(error).toEqual('No item or no project id was given'))
  );
  it('calls verifyItemExists with the correct data', () =>
    addItemToProject({ owner: 'someUserId' }, 'someProjectId').then(() => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
    })
  );
  it('calls Item.createAsync with the correct data', () =>
    addItemToProject({ owner: 'someUserId', name: 'a task' }, 'someProjectId').then(() => {
      expect(Item.createAsync).toBeCalledWith({ owner: 'someUserId', name: 'a task' });
    })
  );
  it('calls Item.updateAsync with the correct data', () =>
    addItemToProject({ owner: 'someUserId', name: 'a task' }, 'someProjectId').then(() => {
      expect(Item.updateAsync).toBeCalledWith({ owner: 'someUserId', id: 'someProjectId', children: ['someItemId'] });
    })
  );
  it('calls Item.updateAsync with the correct data if the project did not have any children', () =>
    addItemToProject({ owner: 'someUserId', name: 'a task' }, 'someProjectWithoutChildren').then(() => {
      expect(Item.updateAsync).toBeCalledWith({ owner: 'someUserId', id: 'someProjectWithoutChildren', children: ['someItemId'] });
    })
  );
  it('resolves with the correct item', () =>
    addItemToProject({ owner: 'someUserId', name: 'a task' }, 'someProjectId').then((item) => {
      expect(item).toEqual({ owner: 'someUserId', name: 'a task', id: 'someItemId' });
    })
  );
});
