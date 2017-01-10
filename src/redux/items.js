import {
  DELETE_ITEM_POUCH,
  INSERT_ITEM_POUCH,
  UPDATE_ITEM_POUCH,
} from './actionTypes';

export const initialState = [];

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
    default: {
      return state;
    }
  }
}
