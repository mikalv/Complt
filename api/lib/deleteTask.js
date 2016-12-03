import { Item } from '../dynamoModels';
import verifyItemExists from './verifyItemExists';
import { verifyInboxExists } from './inbox';
import { verifyRootExists } from './root';


function deleteTask(user, taskId, parentProjectId) {
  return new Promise((resolve, reject) => {
    let parentProjectPromise;
    if (parentProjectId === 'root') {
      parentProjectPromise = verifyRootExists;
    } else if (parentProjectId === 'inbox') {
      parentProjectPromise = verifyInboxExists;
    } else parentProjectPromise = verifyItemExists;
    Promise.all([
      verifyItemExists(user, taskId),
      parentProjectPromise(user, parentProjectId),
    ]).then(([task, parentProject]) => {
      if (
        task.isProject === false &&
        parentProject.isProject === true &&
        parentProject.children.indexOf(task.id) !== -1
      ) {
        const taskIndex = parentProject.children.indexOf(task.id);
        if (taskIndex !== -1) {
          parentProject.children.splice(taskIndex, 1);
          Item.update(parentProject, (projectRemoveChildError) => {
            if (projectRemoveChildError) reject('Error updating the project');
            Item.destroy(task, () => {
              resolve(task);
            });
          });
        } else reject('The task is not a child of the project');
      } else reject('The item of projectId is not a project or the item of taskId is not a task');
    }).catch(() => reject('Error getting items'));
  });
}

export default deleteTask;
