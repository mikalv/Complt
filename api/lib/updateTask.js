import { Item } from '../dynamoModels';
import getItemsByUserAndIds from './getItemsByUserAndIds';

function updateTask(user, task) {
  return getItemsByUserAndIds(user, [task.id]).then((oldTasks) => {
    if (oldTasks[0].isProject === false) {
      return Item.updateAsync({
        ...task,
        owner: user,
      }).then((updatedTask => updatedTask.attrs));
    }
    return Promise.reject('The item may not be a task or you do not own it');
  });
}

export default updateTask;
