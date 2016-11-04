import { ADD_TASK, COMPLETE_TASK } from './actionTypes';

export function addTask(task) {
  return {
    type: ADD_TASK,
    task,
  };
}
export function completeTask(index, isCompleted) {
  return {
    type: COMPLETE_TASK,
    index,
    isCompleted,
  };
}
