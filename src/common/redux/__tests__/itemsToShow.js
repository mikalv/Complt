import reducer, { initialState, SHOW_COMPLETED } from '../itemsToShow';
import { changeItemsToShow } from '../actions';

describe('itemsToShowReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles CHANGE_ITEMS_TO_SHOW correctly', () => {
    expect(reducer(undefined, changeItemsToShow(SHOW_COMPLETED))).toEqual(SHOW_COMPLETED);
  });
});
