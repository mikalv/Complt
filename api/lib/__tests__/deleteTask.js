import deleteTask from '../deleteTask';
import { Item } from '../../dynamoModels';
import verifyItemExists from '../verifyItemExists';

jest.mock('../../dynamoModels').mock('../verifyItemExists');

verifyItemExists.mockImplementation((user, id) => {
  if (!id.includes('Task')) return Promise.resolve({ owner: user, id, isProject: true, children: ['someTaskThatHasAParentProject'] });
  return Promise.resolve({ owner: user, id, isProject: false });
});
Item.updateAsync.mockImplementation(item => Promise.resolve({ atts: item }));
Item.destroyAsync.mockImplementation(item => Promise.resolve({ atts: item }));

describe('deleteTask()', () => {
  it('rejects if it is called with an id for a project as the task', () =>
    deleteTask('someUserId', 'someProjectId', 'someOtherProjectId').catch((error) => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someOtherProjectId');
      expect(Item.updateAsync).not.toBeCalled();
      expect(Item.destroyAsync).not.toBeCalled();
      expect(error).toEqual('The item of projectId is not a project or the item of taskId is not a task');
    })
  );
  it('rejects if it is called with an id for a task for the parent project', () =>
    deleteTask('someUserId', 'someTaskId', 'someOtherTaskId').catch((error) => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someTaskId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someOtherTaskId');
      expect(Item.updateAsync).not.toBeCalled();
      expect(Item.destroyAsync).not.toBeCalled();
      expect(error).toEqual('The item of projectId is not a project or the item of taskId is not a task');
    })
  );
  it('rejects if the parent project does not have the task as a child', () =>
    deleteTask('someUserId', 'someTaskId', 'someProjectId').catch((error) => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someTaskId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(Item.updateAsync).not.toBeCalled();
      expect(Item.destroyAsync).not.toBeCalled();
      expect(error).toEqual('The task is not a child of the project');
    })
  );
  it('destroys the task with Item.destroyAsync', () =>
    deleteTask('someUserId', 'someTaskThatHasAParentProject', 'someProjectId').then(() => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someTaskThatHasAParentProject');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(Item.destroyAsync).toBeCalledWith({ owner: 'someUserId', id: 'someTaskThatHasAParentProject', isProject: false });
    })
  );
  it('updates the parent project with Item.updateAsync', () =>
    deleteTask('someUserId', 'someTaskThatHasAParentProject', 'someProjectId').then(() => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someTaskThatHasAParentProject');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(Item.updateAsync).toBeCalledWith({ owner: 'someUserId', id: 'someProjectId', isProject: true, children: [] });
    })
  );
  it('resolves with the destroyed task', () =>
    deleteTask('someUserId', 'someTaskThatHasAParentProject', 'someProjectId').then((task) => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someTaskThatHasAParentProject');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(task).toEqual({ owner: 'someUserId', id: 'someTaskThatHasAParentProject', isProject: false });
    })
  );
});
