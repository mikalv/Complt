import uuid from 'uuid';
import reducer, { initialState } from '../items';
import * as actions from '../actions';
import { DELETE_ITEM_POUCH, INSERT_ITEM_POUCH, UPDATE_ITEM_POUCH } from '../actionTypes';

jest.mock('uuid');
uuid.mockReturnValue('item5');

const items = [
  { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
  { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
  { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
  { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
];
const itemsWithRoot = [...items, { _id: 'root', isProject: true, children: [] }];
const itemsWithInbox = [...items, { _id: 'inbox', isProject: true, children: [] }];

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
  it('handles CREATE_ITEM with a task correctly', () => {
    expect(reducer(items, actions.createTask('item4', { isProject: false, isCompleted: false, tags: [], name: 'A Task' }))).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3', 'item5'] },
      { _id: 'item5', isProject: false, isCompleted: false, tags: [], name: 'A Task' },
    ]);
  });
  it('handles CREATE_ITEM with a project correctly', () => {
    expect(reducer(items, actions.createProject('item4', { isProject: true, name: 'A Project', children: [] }))).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3', 'item5'] },
      { _id: 'item5', isProject: true, name: 'A Project', children: [] },
    ]);
  });
  it('handles CREATE_ITEM correctly when the parent is root and it doesn\'t exist', () => {
    expect(reducer(items, actions.createProject('root', { isProject: false, isCompleted: false, tags: [], name: 'A Task' }))).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
      { _id: 'root', isProject: true, children: ['item5'] },
      { _id: 'item5', isProject: false, isCompleted: false, tags: [], name: 'A Task' },
    ]);
  });
  it('handles CREATE_ITEM correctly when the parent is root and it does exist', () => {
    expect(reducer(itemsWithRoot, actions.createProject('root', { isProject: false, isCompleted: false, tags: [], name: 'A Task' }))).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
      { _id: 'root', isProject: true, children: ['item5'] },
      { _id: 'item5', isProject: false, isCompleted: false, tags: [], name: 'A Task' },
    ]);
  });
  it('handles CREATE_ITEM correctly when the parent is inbox and it doesn\'t exist', () => {
    expect(reducer(items, actions.createProject('inbox', { isProject: false, isCompleted: false, tags: [], name: 'A Task' }))).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
      { _id: 'inbox', isProject: true, children: ['item5'] },
      { _id: 'item5', isProject: false, isCompleted: false, tags: [], name: 'A Task' },
    ]);
  });
  it('handles CREATE_ITEM correctly when the parent is inbox and it does exist', () => {
    expect(reducer(itemsWithInbox, actions.createProject('inbox', { isProject: false, isCompleted: false, tags: [], name: 'A Task' }))).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
      { _id: 'inbox', isProject: true, children: ['item5'] },
      { _id: 'item5', isProject: false, isCompleted: false, tags: [], name: 'A Task' },
    ]);
  });
});
