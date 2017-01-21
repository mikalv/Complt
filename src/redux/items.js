import {
  DELETE_ITEM_POUCH,
  INSERT_ITEM_POUCH,
  UPDATE_ITEM_POUCH,
  CREATE_ITEM,
  COMPLETE_TASK,
  DELETE_TASK,
  DELETE_PROJECT,
  UPDATE_ITEM,
  MOVE_ITEM,
} from './actionTypes';

export const initialState = [];

function ensureRootAndInboxExists(state, action) {
  if (action.parentProjectId === 'root') {
    if (state.findIndex(item => item._id === 'root') !== -1) return state;
    return [
      ...state,
      { _id: 'root', isProject: true, children: [] },
    ];
  }
  if (action.parentProjectId === 'inbox') {
    if (state.findIndex(item => item._id === 'inbox') !== -1) return state;
    return [
      ...state,
      { _id: 'inbox', isProject: true, children: [] },
    ];
  }
  return state;
}

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ITEM_POUCH: {
      const indexOfId = state.findIndex(item => item._id === action.id);
      if (indexOfId === -1) return state;
      return [
        ...state.slice(0, indexOfId),
        ...state.slice(indexOfId + 1),
      ];
    }
    case INSERT_ITEM_POUCH: {
      return [
        ...state,
        action.item,
      ];
    }
    case UPDATE_ITEM_POUCH: {
      const indexOfId = state.findIndex(item => item._id === action.item._id);
      if (indexOfId === -1) return state;
      return [
        ...state.slice(0, indexOfId),
        action.item,
        ...state.slice(indexOfId + 1),
      ];
    }
    case CREATE_ITEM: {
      const newState = ensureRootAndInboxExists(state, action);
      const parentProjectIndex = newState.findIndex(item => item._id === action.parentProjectId);
      return [
        ...newState.slice(0, parentProjectIndex),
        { ...newState[parentProjectIndex],
          children: [
            ...newState[parentProjectIndex].children,
            action.item._id,
          ] },
        ...newState.slice(parentProjectIndex + 1),
        action.item,
      ];
    }
    case COMPLETE_TASK: {
      const indexOfId = state.findIndex(item => item._id === action.id);
      if (indexOfId === -1) return state;
      return [
        ...state.slice(0, indexOfId),
        {
          ...state[indexOfId],
          isCompleted: action.isCompleted,
        },
        ...state.slice(indexOfId + 1),
      ];
    }
    case DELETE_TASK: {
      const parentProject = state.find(item => item._id === action.parentProjectId);
      const childIndexInParent = parentProject.children.indexOf(action.id);
      if (childIndexInParent === -1) return state;
      const taskIndex = state.findIndex(item => item._id === action.id);
      const stateWithoutTask = [
        ...state.slice(0, taskIndex),
        ...state.slice(taskIndex + 1),
      ];
      const parentProjectIndex = stateWithoutTask.findIndex(item =>
        item._id === action.parentProjectId);
      return [
        ...stateWithoutTask.slice(0, parentProjectIndex),
        { ...parentProject,
          children: [
            ...parentProject.children.slice(0, childIndexInParent),
            ...parentProject.children.slice(childIndexInParent + 1),
          ] },
        ...stateWithoutTask.slice(parentProjectIndex + 1),
      ];
    }
    case DELETE_PROJECT: {
      const parentProject = state.find(item => item._id === action.parentProjectId);
      const childIndexInParent = parentProject.children.indexOf(action.id);
      if (childIndexInParent === -1) return state;
      const childIndex = state.findIndex(item => item._id === action.id);
      if (state[childIndex].children.length > 0) return state;
      const stateWithoutTask = [
        ...state.slice(0, childIndex),
        ...state.slice(childIndex + 1),
      ];
      const parentProjectIndex = stateWithoutTask.findIndex(item =>
        item._id === action.parentProjectId);
      return [
        ...stateWithoutTask.slice(0, parentProjectIndex),
        { ...parentProject,
          children: [
            ...parentProject.children.slice(0, childIndexInParent),
            ...parentProject.children.slice(childIndexInParent + 1),
          ] },
        ...stateWithoutTask.slice(parentProjectIndex + 1),
      ];
    }
    case UPDATE_ITEM: {
      const indexOfOldItem = state.findIndex(item => item._id === action.item._id);
      const oldItem = state[indexOfOldItem];
      let newItem;
      if (oldItem.isProject) {
        newItem = {
          ...oldItem,
          name: action.item.name,
        };
      } else {
        newItem = {
          ...oldItem,
          name: action.item.name,
          tags: action.item.tags,
        };
      }
      return [
        ...state.slice(0, indexOfOldItem),
        newItem,
        ...state.slice(indexOfOldItem + 1),
      ];
    }
    case MOVE_ITEM: {
      const itemIndex = state.findIndex(item => item._id === action.id);
      const previousParentIndex = state.findIndex(item => item._id === action.previousParent);
      const newParentIndex = state.findIndex(item => item._id === action.newParent);
      if (itemIndex === -1 || previousParentIndex === -1 || newParentIndex === -1) return state;
      if (!state[newParentIndex].isProject || !state[previousParentIndex].isProject) return state;
      const previousParent = state[previousParentIndex];
      const childIndexInPreviousParent = previousParent.children.indexOf(action.id);
      if (childIndexInPreviousParent === -1) return state;
      const stateWithoutItemInPreviousParent = [
        ...state.slice(0, previousParentIndex),
        { ...previousParent,
          children: [
            ...previousParent.children.slice(0, childIndexInPreviousParent),
            ...previousParent.children.slice(childIndexInPreviousParent + 1),
          ] },
        ...state.slice(previousParentIndex + 1),
      ];
      const newParent = state[newParentIndex];
      return [
        ...stateWithoutItemInPreviousParent.slice(0, newParentIndex),
        { ...newParent, children: [...newParent.children, action.id] },
        ...stateWithoutItemInPreviousParent.slice(newParentIndex + 1),
      ];
    }
    default: {
      return state;
    }
  }
}
