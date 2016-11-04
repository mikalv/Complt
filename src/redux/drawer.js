import { TOGGLE_DRAWER, DOCK_DRAWER } from './actionTypes';

const initialState = {
  isDocked: false,
  isOpen: false,
};

export default function DrawerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      if (!state.isDocked) {
        return {
          ...state,
          isOpen: !state.isOpen,
        };
      }
      return state;
    case DOCK_DRAWER:
      if (action.shouldDock) {
        return {
          isDocked: true,
          isOpen: true,
        };
      }
      return {
        isDocked: false,
        isOpen: false,
      };
    default:
      return state;
  }
}
