import {
  mutationTaskUpdateResolver,
  mutationDeleteTaskResolver,
  mutationCreateProjectResolver,
  mutationCreateTaskResolver,
} from '../resolvers';
import updateTask from '../lib/updateTask';
import deleteTask from '../lib/deleteTask';
import addItemToProject from '../lib/addItemToProject';

jest.mock('../lib/updateTask').mock('../lib/deleteTask').mock('../lib/addItemToProject');

updateTask.mockReturnValue({ id: 'someUpdatedTask', owner: 'someUserId' });
deleteTask.mockReturnValue({ id: 'someDeletedTask', owner: 'someUserId' });
addItemToProject.mockImplementation(itemToAdd => Promise.resolve(itemToAdd));

describe('mutationTaskUpdateResolver()', () => {
  it('calls updateTask correctly and resolves to the value of updateTask', () => {
    expect(mutationTaskUpdateResolver({ userId: 'someUserId' }, { input: { id: 'someUpdatedTask' } })).toEqual({ id: 'someUpdatedTask', owner: 'someUserId' });
    expect(updateTask).toBeCalledWith('someUserId', { id: 'someUpdatedTask' });
  });
});
describe('mutationDeleteTaskResolver()', () => {
  it('calls deleteTask correctly and resolves to the value of deleteTask', () => {
    expect(mutationDeleteTaskResolver({ userId: 'someUserId' }, { taskId: 'someDeletedTask', parentProjectId: 'someParentProject' })).toEqual({ id: 'someDeletedTask', owner: 'someUserId' });
    expect(deleteTask).toBeCalledWith('someUserId', 'someDeletedTask', 'someParentProject');
  });
});

describe('mutationCreateProjectResolver()', () => {
  it('returns an error if the projectId is inbox', () => {
    expect(mutationCreateProjectResolver({ userId: 'someUserId' }, { project: {}, projectId: 'inbox' }))
    .toEqual(new Error('Projects cannot be added to the inbox'));
  });
  it('calls addItemToProject correctly and resolves to the created project with isSequential = true', () =>
    mutationCreateProjectResolver({ userId: 'someUserId' },
      { project: { name: 'Some Project', isSequential: false },
        projectId: 'root' }).then((project) => {
          const expectedProject = { name: 'Some Project', projectType: 'para', owner: 'someUserId', isProject: true };
          expect(project).toEqual(expectedProject);
          expect(addItemToProject).toBeCalledWith(expectedProject, 'root');
        })
  );
  it('calls addItemToProject correctly and resolves to the created project with isSequential = true', () =>
    mutationCreateProjectResolver({ userId: 'someUserId' },
      { project: { name: 'Some Project', isSequential: true },
        projectId: 'root' }).then((project) => {
          const expectedProject = { name: 'Some Project', projectType: 'seq', owner: 'someUserId', isProject: true };
          expect(project).toEqual(expectedProject);
          expect(addItemToProject).toBeCalledWith(expectedProject, 'root');
        })
  );
});

describe('mutationCreateTaskResolver()', () => {
  it('calls addItemToProject correctly and resolves to the created task', () =>
    mutationCreateTaskResolver({ userId: 'someUserId' },
      { task: { name: 'Some Task', isCompleted: false, tags: [] },
        projectId: 'root' }).then((task) => {
          const expectedTask = { name: 'Some Task', owner: 'someUserId', isProject: false, tags: [], isCompleted: false };
          expect(task).toEqual(expectedTask);
          expect(addItemToProject).toBeCalledWith(expectedTask, 'root');
        })
  );
});
