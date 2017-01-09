import reorderProjectChildren from '../reorderProjectChildren';
import { Item } from '../../dynamoModels';
import verifyItemExists from '../verifyItemExists';

jest.mock('../../dynamoModels').mock('../verifyItemExists');

verifyItemExists.mockImplementation((userId, itemId) => {
  if (itemId.includes('Task')) return Promise.resolve({ owner: userId, id: itemId, isProject: false });
  if (itemId.includes('Children')) return Promise.resolve({ owner: userId, id: itemId, isProject: true, children: ['someItemId1', 'someItemId2'] });
  if (itemId.includes('Child')) return Promise.resolve({ owner: userId, id: itemId, isProject: true, children: ['someItemId1'] });
  return Promise.resolve({ owner: userId, id: itemId, isProject: true });
});
Item.updateAsync.mockImplementation(item => Promise.resolve({ attrs: item }));

describe('reorderProjectChildren()', () => {
  it('rejects if it is called with no arguments', () =>
    reorderProjectChildren().catch((error) => {
      expect(error).toEqual('No user id, project id or project children were given');
    })
  );
  it('rejects if it is called with an id for a task as the project', () =>
    reorderProjectChildren('someUserId', 'someTaskId', ['someItemId1', 'someItemId2']).catch((error) => {
      expect(error).toEqual('The project id is not for a project');
    })
  );
  it('rejects if the project has no children', () =>
    reorderProjectChildren('someUserId', 'someProjectId', ['someItemId1', 'someItemId2']).catch((error) => {
      expect(error).toEqual('The project does not have children');
    })
  );
  it('rejects if the project only has one child', () =>
    reorderProjectChildren('someUserId', 'someProjectIdWithAChild', ['someItemId1']).catch((error) => {
      expect(error).toEqual('The project does not have more than 1 child');
    })
  );
  it('rejects if the project and the new project children are different lengths', () =>
    reorderProjectChildren('someUserId', 'someProjectIdWithChildren', ['someItemId1', 'someItemId2', 'someItemId3']).catch((error) => {
      expect(error).toEqual('The current project children and the new project children do not contain the same items');
    })
  );
  it('rejects if the project and the new project children contain different items', () =>
    reorderProjectChildren('someUserId', 'someProjectIdWithChildren', ['someItemId1', 'someItemId3']).catch((error) => {
      expect(error).toEqual('The current project children and the new project children do not contain the same items');
    })
  );
  it('updates the project correctly and resolves to the correct value', () =>
    reorderProjectChildren('someUserId', 'someProjectIdWithChildren', ['someItemId2', 'someItemId1']).then((project) => {
      expect(Item.updateAsync).toBeCalled();
      expect(project).toEqual({ owner: 'someUserId', id: 'someProjectIdWithChildren', children: ['someItemId2', 'someItemId1'] });
    })
  );
});
