import { ADD_TASK, COMPLETE_TASK } from './actionTypes';

const initialState = [];

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.task];
    case COMPLETE_TASK:
      return state.map((task, i) => {
        if (i !== action.index) {
          return task;
        }
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      });
    default:
      return state;
  }
}
