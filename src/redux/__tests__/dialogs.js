import reducer, { initialState } from '../dialogs';
import { showUpdateItemDialog, hideUpdateItemDialog, handleUpdateItem, showMoveItemDialog, hideMoveItemDialog } from '../actions';
import { HIDE_UPDATE_ITEM_DIALOG, UPDATE_ITEM } from '../actionTypes';
import mockStore from '../mockStore';

describe('dialogsReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles SHOW_UPDATE_ITEM_DIALOG correctly', () => {
    expect(reducer(undefined, showUpdateItemDialog('someItemId'))).toEqual({
      updateItem: {
        visible: true,
        id: 'someItemId',
      },
      moveItem: {
        visible: false,
        id: '',
        parentProject: '',
      },
    });
  });
  it('handles HIDE_UPDATE_ITEM_DIALOG correctly', () => {
    expect(reducer({
      updateItem: {
        visible: true,
        id: 'someItemId',
      },
      moveItem: {
        visible: false,
        id: '',
        parentProject: '',
      },
    }, hideUpdateItemDialog())).toEqual(initialState);
  });
  it('handles SHOW_MOVE_ITEM_DIALOG correctly', () => {
    expect(reducer(undefined, showMoveItemDialog('someItemId', 'someParentId'))).toEqual({
      moveItem: {
        visible: true,
        id: 'someItemId',
        parentProject: 'someParentId',
      },
      updateItem: {
        visible: false,
        id: '',
      },
    });
  });
  it('handles HIDE_MOVE_ITEM_DIALOG correctly', () => {
    expect(reducer({
      moveItem: {
        visible: true,
        id: 'someItemId',
        parentProject: 'someParentId',
      },
      updateItem: {
        visible: false,
        id: '',
      },
    }, hideMoveItemDialog())).toEqual(initialState);
  });
});

describe('handleUpdateItem action creator', () => {
  it('dispatches HIDE_UPDATE_ITEM_DIALOG correctly', () => {
    const store = mockStore();
    store.dispatch(handleUpdateItem('some task with a @tag', { isProject: false }));
    expect(store.getActions()[1]).toEqual({ type: HIDE_UPDATE_ITEM_DIALOG });
  });
  it('dispatches UPDATE_ITEM correctly with a task', () => {
    const store = mockStore();
    store.dispatch(handleUpdateItem('some task with a @tag', { isProject: false, name: 'some old name', tags: ['@someOtherTag'] }));
    expect(store.getActions()[0]).toEqual({
      type: UPDATE_ITEM,
      item: {
        isProject: false,
        name: 'some task with a',
        tags: ['@tag'],
      },
    });
  });
  it('dispatches UPDATE_ITEM correctly with a project', () => {
    const store = mockStore();
    store.dispatch(handleUpdateItem('some project', { isProject: true, name: 'some old project name', children: ['someOtherTask', 'oneMoreTask'] }));
    expect(store.getActions()[0]).toEqual({
      type: UPDATE_ITEM,
      item: {
        isProject: true,
        name: 'some project',
        children: ['someOtherTask', 'oneMoreTask'],
      },
    });
  });
});
