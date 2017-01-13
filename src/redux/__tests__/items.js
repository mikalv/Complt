import reducer, { initialState } from '../items';
import { DELETE_ITEM_POUCH, INSERT_ITEM_POUCH, UPDATE_ITEM_POUCH } from '../actionTypes';

const items = [
  { _id: 'item1' },
  { _id: 'item2' },
  { _id: 'item3' },
  { _id: 'item4' },
];

describe('itemsReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles DELETE_ITEM_POUCH correctly', () => {
    expect(reducer(items, { type: DELETE_ITEM_POUCH, id: 'item3' })).toEqual([
      { _id: 'item1' },
      { _id: 'item2' },
      { _id: 'item4' },
    ]);
  });
  it('handles INSERT_ITEM_POUCH correctly', () => {
    expect(reducer(items, { type: INSERT_ITEM_POUCH, item: { _id: 'item20' } })).toEqual([
      { _id: 'item1' },
      { _id: 'item2' },
      { _id: 'item3' },
      { _id: 'item4' },
      { _id: 'item20' },
    ]);
  });
  it('handles UPDATE_ITEM_POUCH correctly', () => {
    expect(reducer(items, { type: UPDATE_ITEM_POUCH, item: { _id: 'item2', someOtherProperty: true } })).toEqual([
      { _id: 'item1' },
      { _id: 'item2', someOtherProperty: true },
      { _id: 'item3' },
      { _id: 'item4' },
    ]);
  });
});
