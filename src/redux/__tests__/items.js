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
const itemsWithOrphanTask = [...items, { _id: 'item5', isProject: false, isCompleted: false, tags: [] }];
const itemsWithProjectWithoutChildren = [...items, { _id: 'item5', isProject: true, children: [] }, { _id: 'root', isProject: true, children: ['item5'] }];
const itemsWithOrphanProject = [...items, { _id: 'item5', isProject: true, children: [] }];
const itemsWithProjectWithChildren = [...items, { _id: 'root', isProject: true, children: ['item4'] }];

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
  it('handles DELETE_ITEM_POUCH correctly if the id doesn\'t exist', () => {
    expect(reducer(items, { type: DELETE_ITEM_POUCH, id: 'item20' })).toEqual(items);
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
  it('handles UPDATE_ITEM_POUCH correctly if the id doesn\'t exist', () => {
    expect(reducer(items, { type: UPDATE_ITEM_POUCH, item: { _id: 'item20', isProject: false, isCompleted: false, tags: [] } })).toEqual(items);
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
  it('handles COMPLETE_TASK correctly', () => {
    expect(reducer(items, actions.completeTask('item3', true))).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item3', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
    ]);
  });
  it('handles COMPLETE_TASK correctly if the id doesn\'t exist', () => {
    expect(reducer(items, actions.completeTask('item30', true))).toEqual(items);
  });
  it('handles DELETE_TASK correctly', () => {
    expect(reducer(items, actions.deleteTask('item4', 'item3'))).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2'] },
    ]);
  });
  it('handles DELETE_TASK correctly if the task to delete is not in the parent\'s children', () => {
    expect(reducer(itemsWithOrphanTask, actions.deleteTask('item4', 'item5'))).toEqual(itemsWithOrphanTask);
  });
  it('handles DELETE_PROJECT correctly', () => {
    expect(reducer(itemsWithProjectWithoutChildren, actions.deleteProject('root', 'item5'))).toEqual([
      { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      { _id: 'item4', isProject: true, children: ['item1', 'item2', 'item3'] },
      { _id: 'root', isProject: true, children: [] },
    ]);
  });
  it('handles DELETE_PROJECT correctly if the project to delete is not in the parent\'s children', () => {
    expect(reducer(itemsWithOrphanProject, actions.deleteProject('item4', 'item5'))).toEqual(itemsWithOrphanProject);
  });
  it('handles DELETE_PROJECT correctly if the project to delete has children', () => {
    expect(reducer(itemsWithProjectWithChildren, actions.deleteProject('root', 'item4'))).toEqual(itemsWithProjectWithChildren);
  });
});