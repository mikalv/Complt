import {
  DELETE_ITEM_POUCH,
  INSERT_ITEM_POUCH,
  BATCH_INSERT_ITEM_POUCH,
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
export const initialState = {};

function ensureRootAndInboxExists(state, action) {
  if (action.parentProjectId === 'root') {
    if (state.root) return state;
    return { ...state, root: { _id: 'root', isProject: true, children: [] } };
  }
  if (action.parentProjectId === 'inbox') {
    if (state.inbox) return state;
    return { ...state, inbox: { _id: 'inbox', isProject: true, children: [] } };
  }
  return state;
}

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ITEM_WITHOUT_PARENT:
    case DELETE_ITEM_POUCH: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case INSERT_ITEM_POUCH: {
      return { ...state, [action.item._id]: action.item };
    }
    case BATCH_INSERT_ITEM_POUCH: {
      return {
        ...state,
        ...action.items.reduce((obj, item) => {
          obj[item._id] = item; // eslint-disable-line no-param-reassign
          return obj;
        }, {}),
      };
    }
    case UPDATE_ITEM_POUCH: {
      return { ...state, [action.item._id]: action.item };
    }
    case CREATE_ITEM: {
      const newState = ensureRootAndInboxExists(state, action);
      return {
        ...newState,
        [action.parentProjectId]: {
          ...newState[action.parentProjectId],
          children: [
            ...newState[action.parentProjectId].children,
            action.item._id,
          ],
        },
        [action.item._id]: action.item,
      };
    }
    case COMPLETE_ITEM: {
      if (state[action.id] === undefined) return state;
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isCompleted: action.isCompleted,
        },
      };
    }
    case DELETE_ITEM: {
      const parentProject = state[action.parentProjectId];
      const child = state[action.id];
      if (child.isProject && child.children.length > 0) return state;
      const childIndexInParent = parentProject.children.indexOf(action.id);
      if (childIndexInParent === -1) return state;
      const newState = {
        ...state,
        [parentProject._id]: {
          ...parentProject,
          children: [
            ...parentProject.children.slice(0, childIndexInParent),
            ...parentProject.children.slice(childIndexInParent + 1),
          ],
        },
      };
      delete newState[action.id];
      return newState;
    }
    case UPDATE_ITEM: {
      const oldItem = state[action.item._id];
      return {
        ...state,
        [action.item._id]: {
          ...oldItem,
          name: action.item.name,
          tags: action.item.tags,
          dates: action.item.dates,
        },
      };
    }
    case MOVE_ITEM: {
      if (action.previousParent === action.newParent) return state;
      const item = state[action.id];
      const previousParent = state[action.previousParent];
      const newParent = state[action.newParent];
      if (
        newParent === undefined ||
        previousParent === undefined ||
        item === undefined
      )
        return state;
      if (newParent.isProject !== true || previousParent.isProject !== true)
        return state;
      const childIndexInPreviousParent = previousParent.children.indexOf(
        action.id
      );
      if (childIndexInPreviousParent === -1) return state;
      return {
        ...state,
        [previousParent._id]: {
          ...previousParent,
          children: [
            ...previousParent.children.slice(0, childIndexInPreviousParent),
            ...previousParent.children.slice(childIndexInPreviousParent + 1),
          ],
        },
        [newParent._id]: {
          ...newParent,
          children: [...newParent.children, action.id],
        },
      };
    }
    case MOVE_ITEM_WITHOUT_PARENT: {
      const newParent = state[action.newParent];
      const item = state[action.id];
      if (
        item === undefined ||
        newParent === undefined ||
        newParent.isProject !== true
      )
        return state;
      return {
        ...state,
        [newParent._id]: {
          ...newParent,
          children: [...newParent.children, action.id],
        },
      };
    }
    case REORDER_ITEM: {
      if (action.oldIndex === action.newIndex) return state;
      const project = state[action.id];
      const newProjectChildren = arrayMove(
        project.children,
        action.oldIndex,
        action.newIndex
      );
      return {
        ...state,
        [project._id]: { ...project, children: newProjectChildren },
      };
    }
    default: {
      return state;
    }
  }
}
