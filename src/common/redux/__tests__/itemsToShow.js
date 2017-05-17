import { REHYDRATE } from 'redux-persist/es/constants';
import reducer, { initialState, SHOW_COMPLETED } from '../itemsToShow';
import { changeItemsToShow } from '../actions';

jest.mock('../../../web/showToast');

describe('itemsToShowReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles CHANGE_ITEMS_TO_SHOW correctly', () => {
    expect(reducer(undefined, changeItemsToShow(SHOW_COMPLETED))).toEqual(
      SHOW_COMPLETED
    );
  });
  it('handles REHYDRATE correctly', () => {
    expect(
      reducer(initialState, {
        type: REHYDRATE,
        payload: { itemsToShow: SHOW_COMPLETED },
      })
    ).toEqual(SHOW_COMPLETED);
  });
});
