import { SHOW_TOAST, DISMISS_TOAST } from './actionTypes';

export const initialState = [];

export default function toastsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return [...state, action.toast];
    case DISMISS_TOAST: {
      const [, ...newState] = state;
      return newState;
    }
    default:
      return state;
  }
}
