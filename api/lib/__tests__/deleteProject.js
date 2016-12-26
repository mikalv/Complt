import deleteProject from '../deleteProject';
import { Item } from '../../dynamoModels';
import verifyItemExists from '../verifyItemExists';

jest.mock('../../dynamoModels').mock('../verifyItemExists');

verifyItemExists.mockImplementation((user, id) => {
  if (id.includes('Parent')) return Promise.resolve({ owner: user, id, isProject: true, children: ['someProjectId', 'someTaskId', 'someProjectWithChildrenId'] });
  if (id.includes('WithChildren')) return Promise.resolve({ owner: user, id, isProject: true, children: ['someTaskId'] });
  if (id.includes('Task')) return Promise.resolve({ owner: user, id, isProject: false });
  return Promise.resolve({ owner: user, id, isProject: true });
});
Item.updateAsync.mockImplementation(item => Promise.resolve({ atts: item }));
Item.destroyAsync.mockImplementation(item => Promise.resolve({ atts: item }));

describe('deleteProject()', () => {
  it('rejects if it is called with an id for a task as the project', () =>
    deleteProject('someUserId', 'someTaskId', 'someParentProjectId').catch((error) => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someTaskId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someParentProjectId');
      expect(Item.updateAsync).not.toBeCalled();
      expect(Item.destroyAsync).not.toBeCalled();
      expect(error).toEqual('The project or parent project is not a project');
    })
  );
  it('rejects if it is called with an id for a task as the parent project', () =>
    deleteProject('someUserId', 'someProjectId', 'someTaskId').catch((error) => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someTaskId');
      expect(Item.updateAsync).not.toBeCalled();
      expect(Item.destroyAsync).not.toBeCalled();
      expect(error).toEqual('The project or parent project is not a project');
    })
  );
  it('rejects if the parent project does not have any children', () =>
    deleteProject('someUserId', 'someProjectId', 'someOtherProjectId').catch((error) => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someOtherProjectId');
      expect(Item.updateAsync).not.toBeCalled();
      expect(Item.destroyAsync).not.toBeCalled();
      expect(error).toEqual('The parent project does not have any children');
    })
  );
  it('rejects if the project is not a child of the parent project', () =>
    deleteProject('someUserId', 'someProjectId', 'someProjectWithChildrenId').catch((error) => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectWithChildrenId');
      expect(Item.updateAsync).not.toBeCalled();
      expect(Item.destroyAsync).not.toBeCalled();
      expect(error).toEqual('The project is not a child of the parent project');
    })
  );
  it('rejects if the project has children', () =>
    deleteProject('someUserId', 'someProjectWithChildrenId', 'someParentProjectId').catch((error) => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectWithChildrenId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someParentProjectId');
      expect(Item.updateAsync).not.toBeCalled();
      expect(Item.destroyAsync).not.toBeCalled();
      expect(error).toEqual('The project has children, please delete them and try again');
    })
  );
  it('destroys the task with Item.destroyAsync', () =>
    deleteProject('someUserId', 'someProjectId', 'someParentProjectId').then(() => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someParentProjectId');
      expect(Item.destroyAsync).toBeCalledWith({ owner: 'someUserId', id: 'someProjectId', isProject: true });
    })
  );
  it('updates the parent project with Item.updateAsync', () =>
    deleteProject('someUserId', 'someProjectId', 'someParentProjectId').then(() => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someParentProjectId');
      expect(Item.updateAsync).toBeCalledWith({ owner: 'someUserId', id: 'someParentProjectId', isProject: true, children: ['someTaskId', 'someProjectWithChildrenId'] });
    })
  );
  it('resolves with the destroyed task', () =>
    deleteProject('someUserId', 'someProjectId', 'someParentProjectId').then((task) => {
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someProjectId');
      expect(verifyItemExists).toBeCalledWith('someUserId', 'someParentProjectId');
      expect(task).toEqual({ owner: 'someUserId', id: 'someProjectId', isProject: true });
    })
  );
  it('rejects if it is passed no arguments', () =>
    deleteProject().catch((error) => {
      expect(error).toEqual('No user id, no project id or no parent project id was given');
    })
  );
});
