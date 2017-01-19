import { SHOW_UPDATE_ITEM_DIALOG, HIDE_UPDATE_ITEM_DIALOG } from './actionTypes';

export const initialState = {
  updateItem: {
    visible: false,
    id: '',
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
    default:
      return state;
  }
}
