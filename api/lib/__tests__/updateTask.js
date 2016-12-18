import updateTask from '../updateTask';
import { Item } from '../../dynamoModels';
import getItemsByUserAndIds from '../getItemsByUserAndIds';

jest.mock('../../dynamoModels').mock('../getItemsByUserAndIds');

describe('updateTask()', () => {
  it('rejects if it is called with an id is that is for a project', () => {
    getItemsByUserAndIds.mockReturnValueOnce(Promise.resolve([{ id: 'someProjectId', owner: 'someUserId', isProject: true }]));
    return updateTask('someUserId', { id: 'someProjectId' }).catch((error) => {
      expect(error).toEqual('The item may not be a task or you do not own it');
      expect(getItemsByUserAndIds).toBeCalledWith('someUserId', ['someProjectId']);
    });
  });
  it('rejects if it is called with no arguments', () =>
    updateTask().catch(error => expect(error).toEqual('No user id or no task id was given'))
  );
  it('resolves with an updated item and calls Item.updateAsync with the correct arguments', () => {
    getItemsByUserAndIds.mockReturnValueOnce(Promise.resolve([{ id: 'someTaskId', owner: 'someUserId', isProject: false, isCompleted: false }]));
    Item.updateAsync.mockImplementationOnce(item => Promise.resolve({ attrs: item }));
    return updateTask('someUserId', { id: 'someTaskId', isCompleted: true }).then((task) => {
      expect(getItemsByUserAndIds).toBeCalledWith('someUserId', ['someProjectId']);
      expect(Item.updateAsync).toBeCalledWith({ id: 'someTaskId', isCompleted: true, owner: 'someUserId' });
      expect(task).toEqual({ id: 'someTaskId', isCompleted: true, owner: 'someUserId' });
    });
  });
});
