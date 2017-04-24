import {
  DELETE_ITEM_POUCH,
  INSERT_ITEM_POUCH,
  UPDATE_ITEM_POUCH,
  CREATE_ITEM,
  COMPLETE_ITEM,
  DELETE_ITEM,
  DELETE_ITEM_WITHOUT_PARENT,
  UPDATE_ITEM,
  MOVE_ITEM,
  MOVE_ITEM_WITHOUT_PARENT,
  REORDER_ITEM,
} from './actionTypes';

function arrayMove(arr, previousIndex, newIndex) {
  const array = arr.slice(0);
  let safeNewIndex = newIndex;
  if (newIndex >= array.length) {
    safeNewIndex = array.length - 1;
  }
  array.splice(safeNewIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
}
export const initialState = [];

function ensureRootAndInboxExists(state, action) {
  if (action.parentProjectId === 'root') {
    if (state.findIndex(item => item._id === 'root') !== -1) return state;
    return [...state, { _id: 'root', isProject: true, children: [] }];
  }
  if (action.parentProjectId === 'inbox') {
    if (state.findIndex(item => item._id === 'inbox') !== -1) return state;
    return [...state, { _id: 'inbox', isProject: true, children: [] }];
  }
  return state;
}

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ITEM_WITHOUT_PARENT:
    case DELETE_ITEM_POUCH: {
      const indexOfId = state.findIndex(item => item._id === action.id);
      if (indexOfId === -1) return state;
      return [...state.slice(0, indexOfId), ...state.slice(indexOfId + 1)];
    }
    case INSERT_ITEM_POUCH: {
      return [...state, action.item];
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
      const parentProjectIndex = newState.findIndex(
        item => item._id === action.parentProjectId
      );
      return [
        ...newState.slice(0, parentProjectIndex),
        {
          ...newState[parentProjectIndex],
          children: [...newState[parentProjectIndex].children, action.item._id],
        },
        ...newState.slice(parentProjectIndex + 1),
        action.item,
      ];
    }
    case COMPLETE_ITEM: {
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
    case DELETE_ITEM: {
      const parentProject = state.find(
        item => item._id === action.parentProjectId
      );
      const childIndexInParent = parentProject.children.indexOf(action.id);
      if (childIndexInParent === -1) return state;
      const childIndex = state.findIndex(item => item._id === action.id);
      if (state[childIndex].isProject && state[childIndex].children.length > 0)
        return state;
      const stateWithoutTask = [
        ...state.slice(0, childIndex),
        ...state.slice(childIndex + 1),
      ];
      const parentProjectIndex = stateWithoutTask.findIndex(
        item => item._id === action.parentProjectId
      );
      return [
        ...stateWithoutTask.slice(0, parentProjectIndex),
        {
          ...parentProject,
          children: [
            ...parentProject.children.slice(0, childIndexInParent),
            ...parentProject.children.slice(childIndexInParent + 1),
          ],
        },
        ...stateWithoutTask.slice(parentProjectIndex + 1),
      ];
    }
    case UPDATE_ITEM: {
      const indexOfOldItem = state.findIndex(
        item => item._id === action.item._id
      );
      const oldItem = state[indexOfOldItem];
      return [
        ...state.slice(0, indexOfOldItem),
        {
          ...oldItem,
          name: action.item.name,
          tags: action.item.tags,
          dates: action.item.dates,
        },
        ...state.slice(indexOfOldItem + 1),
      ];
    }
    case MOVE_ITEM: {
      if (action.previousParent === action.newParent) return state;
      const itemIndex = state.findIndex(item => item._id === action.id);
      const previousParentIndex = state.findIndex(
        item => item._id === action.previousParent
      );
      const newParentIndex = state.findIndex(
        item => item._id === action.newParent
      );
      if (
        itemIndex === -1 ||
        previousParentIndex === -1 ||
        newParentIndex === -1
      )
        return state;
      if (
        !state[newParentIndex].isProject ||
        !state[previousParentIndex].isProject
      )
        return state;
      const previousParent = state[previousParentIndex];
      const childIndexInPreviousParent = previousParent.children.indexOf(
        action.id
      );
      if (childIndexInPreviousParent === -1) return state;
      const stateWithoutItemInPreviousParent = [
        ...state.slice(0, previousParentIndex),
        {
          ...previousParent,
          children: [
            ...previousParent.children.slice(0, childIndexInPreviousParent),
            ...previousParent.children.slice(childIndexInPreviousParent + 1),
          ],
        },
        ...state.slice(previousParentIndex + 1),
      ];
      const newParent = state[newParentIndex];
      return [
        ...stateWithoutItemInPreviousParent.slice(0, newParentIndex),
        { ...newParent, children: [...newParent.children, action.id] },
        ...stateWithoutItemInPreviousParent.slice(newParentIndex + 1),
      ];
    }
    case MOVE_ITEM_WITHOUT_PARENT: {
      const newParentIndex = state.findIndex(
        item => item._id === action.newParent
      );
      const itemIndex = state.findIndex(item => item._id === action.id);
      if (itemIndex === -1 || newParentIndex === -1) return state;
      const newParent = state[newParentIndex];
      if (!newParent.isProject) return state;
      return [
        ...state.slice(0, newParentIndex),
        { ...newParent, children: [...newParent.children, action.id] },
        ...state.slice(newParentIndex + 1),
      ];
    }
    case REORDER_ITEM: {
      if (action.oldIndex === action.newIndex) return state;
      const projectIndex = state.findIndex(item => item._id === action.id);
      const project = state[projectIndex];
      const newProjectChildren = arrayMove(
        project.children,
        action.oldIndex,
        action.newIndex
      );
      return [
        ...state.slice(0, projectIndex),
        { ...project, children: newProjectChildren },
        ...state.slice(projectIndex + 1),
      ];
    }
    default: {
      return state;
    }
  }
}
