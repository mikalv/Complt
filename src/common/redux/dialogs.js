import { SHOW_UPDATE_ITEM_DIALOG, HIDE_UPDATE_ITEM_DIALOG, SHOW_MOVE_ITEM_DIALOG, HIDE_MOVE_ITEM_DIALOG } from './actionTypes';

export const initialState = {
  updateItem: {
    visible: false,
    id: '',
  },
  moveItem: {
    visible: false,
    id: '',
    parentProject: '',
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_UPDATE_ITEM_DIALOG:
      return {
        ...state,
        updateItem: {
          visible: true,
          id: action.id,
        },
      };
    case HIDE_UPDATE_ITEM_DIALOG:
      return {
        ...state,
        updateItem: {
          visible: false,
          id: '',
        },
      };
    case SHOW_MOVE_ITEM_DIALOG:
      return {
        ...state,
        moveItem: {
          visible: true,
          id: action.id,
          parentProject: action.parentProject,
        },
      };
    case HIDE_MOVE_ITEM_DIALOG:
      return {
        ...state,
        moveItem: {
          visible: false,
          id: '',
          parentProject: '',
        },
      };
    default:
      return state;
  }
}
