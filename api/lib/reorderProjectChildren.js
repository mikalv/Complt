import { Item } from '../dynamoModels';
import verifyItemExists from './verifyItemExists';

function reorderProjectChildren(user, projectId, newProjectChildren) {
  if (!user || !projectId || !newProjectChildren) return Promise.reject('No user id, project id or project children were given');
  return verifyItemExists(user, projectId).then((project) => {
    if (project.isProject === true) {
      if (project.children) {
        if (project.children.length > 1) {
          if (JSON.stringify(project.children.slice().sort()) ===
          JSON.stringify(newProjectChildren.slice().sort())) {
            return Item.updateAsync({ id: projectId, owner: user, children: newProjectChildren })
            .then(item => item.attrs);
          }
          return Promise.reject('The current project children and the new project children do not contain the same items');
        }
        return Promise.reject('The project does not have more than 1 child');
      }
      return Promise.reject('The project does not have children');
    }
    return Promise.reject('The project id is not for a project');
  });
}

export default reorderProjectChildren;
