import reducer from '../projects';
import { addTask, completeTask } from '../actions';

const task = {
  isProject: false,
  name: 'Test Task',
  contexts: ['@test'],
};

describe('drawerReducer', () => {
  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it('should handle ADD_TASK', () => {
    expect(reducer(undefined, addTask(task))).toEqual([task]);
  });
  it('should handle COMPLETE_TASK', () => {
    expect(reducer([task], completeTask(0))).toEqual([{ ...task, isCompleted: true }]);
  });
});
