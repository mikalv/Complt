import { Item } from '../dynamo/models';
import getItemsByUserAndIds from './getItemsByUserAndIds';

function updateTask(user, task) {
  return new Promise((resolve, reject) => {
    getItemsByUserAndIds(user, [task.id]).then((oldTasks) => {
      if (oldTasks[0].isProject === false) {
        Item.update({
          ...task,
          owner: user,
        }, (error, updatedTask) => {
          if (error) reject('Error updating task');
          resolve(updatedTask.attrs);
        });
      } else reject('The item may not be a task or you do not own it');
    });
  });
}

export default updateTask;
