import { Item } from '../dynamoModels';
import verifyItemExists from './verifyItemExists';

function deleteTask(user, taskId, parentProjectId) {
  return Promise.all([
    verifyItemExists(user, taskId),
    verifyItemExists(user, parentProjectId),
  ]).then(([task, parentProject]) => {
    if (
      task.isProject === false &&
      parentProject.isProject === true &&
      parentProject.children.indexOf(task.id) !== -1
    ) {
      const taskIndex = parentProject.children.indexOf(task.id);
      if (taskIndex !== -1) {
        parentProject.children.splice(taskIndex, 1);
        return Promise.all([
          Item.updateAsync(parentProject),
          Item.destroyAsync(task),
        ]).then(() => task);
      }
      return Promise.reject('The task is not a child of the project');
    }
    return Promise.reject('The item of projectId is not a project or the item of taskId is not a task');
  });
}

export default deleteTask;
