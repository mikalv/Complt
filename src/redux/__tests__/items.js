import reducer, { initialState } from '../items';
import { DELETE_ITEM_POUCH, INSERT_ITEM_POUCH, UPDATE_ITEM_POUCH } from '../actionTypes';

const items = [
  { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
  { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
  { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
  { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
];

describe('itemsReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles DELETE_ITEM_POUCH correctly', () => {
    expect(reducer(items, { type: DELETE_ITEM_POUCH, id: 'item3' })).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
    ]);
  });
  it('handles INSERT_ITEM_POUCH correctly', () => {
    expect(reducer(items, { type: INSERT_ITEM_POUCH, item: { _id: 'item20', isProject: true, children: [] } })).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
      { _id: 'item20', isProject: true, children: [] },
    ]);
  });
  it('handles UPDATE_ITEM_POUCH correctly', () => {
    expect(reducer(items, { type: UPDATE_ITEM_POUCH, item: { _id: 'item2', isProject: false, isCompleted: false, tags: [] } })).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: false, tags: [] },
      { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
    ]);
  });
});
