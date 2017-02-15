import { CHANGE_ITEMS_TO_SHOW } from './actionTypes';

export const SHOW_ALL = 'All';
export const SHOW_NOT_COMPLETED = 'Not Completed';
export const SHOW_COMPLETED = 'Completed';

export const values = [SHOW_ALL, SHOW_NOT_COMPLETED, SHOW_COMPLETED];

export const initialState = SHOW_ALL;

export default function itemsToShowReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ITEMS_TO_SHOW:
      return action.option;
    default:
      return state;
  }
}
