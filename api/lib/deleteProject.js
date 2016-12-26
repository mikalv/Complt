import verifyItemExists from './verifyItemExists';
import { Item } from '../dynamoModels';

export default function deleteProject(user, projectId, parentProjectId) {
  if (!user || !projectId || !parentProjectId) return Promise.reject('No user id, no project id or no parent project id was given');
  return Promise.all([
    verifyItemExists(user, projectId),
    verifyItemExists(user, parentProjectId),
  ]).then(([project, parentProject]) => {
    if (project.isProject === true && parentProject.isProject === true) {
      if (!parentProject.children) return Promise.reject('The parent project does not have any children');
      const taskIndex = parentProject.children.indexOf(project.id);
      if (taskIndex !== -1) {
        if (!project.children || project.children.length === 0) {
          parentProject.children.splice(taskIndex, 1);
          return Promise.all([
            Item.updateAsync(parentProject),
            Item.destroyAsync(project),
          ]).then(() => project);
        }
        return Promise.reject('The project has children, please delete them and try again');
      }
      return Promise.reject('The project is not a child of the parent project');
    }
    return Promise.reject('The project or parent project is not a project');
  });
}
