import getItemsByUserAndIds from './lib/getItemsByUserAndIds';
import verifyItemExists from './lib/verifyItemExists';
import updateTask from './lib/updateTask';
import deleteTask from './lib/deleteTask';
import deleteProject from './lib/deleteProject';
import addItemToProject from './lib/addItemToProject';

export function queryItemByIdResolver(rootValue, { id }) {
  if (id !== 'inbox' && id !== 'root') {
    return getItemsByUserAndIds(rootValue.userId, [id]).then(items => items[0]);
  }
  return new Error(`Please do not request the ${id} project from this field`);
}
export function queryInboxResolver(rootValue) {
  return verifyItemExists(rootValue.userId, 'inbox')
    .then(inbox => getItemsByUserAndIds(rootValue.userId, inbox.children));
}
export function queryRootResolver(rootValue) {
  return verifyItemExists(rootValue.userId, 'root')
    .then(rootProject => getItemsByUserAndIds(rootValue.userId, rootProject.children));
}
export function queryUserResolver({ user }) {
  return user;
}
export function mutationTaskUpdateResolver({ userId }, { input }) {
  return updateTask(userId, input);
}
export function mutationDeleteTaskResolver({ userId }, { parentProjectId, taskId }) {
  return deleteTask(userId, taskId, parentProjectId);
}
export function mutationDeleteProjectResolver({ userId }, { parentProjectId, projectId }) {
  if (projectId === 'inbox' || projectId === 'root') return new Error(`The ${projectId} project cannot be deleted`);
  return deleteProject(userId, projectId, parentProjectId);
}
export function mutationCreateProjectResolver({ userId }, { project, projectId }) {
  const projectToCreate = {
    name: project.name,
    projectType: project.isSequential ? 'seq' : 'para',
    owner: userId,
    isProject: true,
  };
  if (projectId === 'inbox') {
    return new Error('Projects cannot be added to the inbox');
  }
  return addItemToProject(projectToCreate, projectId)
  .then(projectCreated => projectCreated);
}
export function mutationCreateTaskResolver({ userId }, { task, projectId }) {
  const taskToCreate = {
    name: task.name,
    isCompleted: task.isCompleted,
    tags: task.tags,
    owner: userId,
    isProject: false,
  };
  return addItemToProject(taskToCreate, projectId).then(taskCreated => taskCreated);
}
