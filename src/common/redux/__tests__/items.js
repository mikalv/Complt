import uuid from '../../utils/uuid';
import reducer, { initialState } from '../items';
import * as actions from '../actions';

jest.mock('../../../web/showToast');

jest.mock('../../utils/uuid');
uuid.mockReturnValue('item5');

const items = {
  item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
  item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
  item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
  item4: {
    _id: 'item4',
    isProject: true,
    children: ['item1', 'item2', 'item3'],
  },
};

const itemsWithRoot = {
  ...items,
  root: { _id: 'root', isProject: true, children: [] },
};
const itemsWithInbox = {
  ...items,
  inbox: { _id: 'inbox', isProject: true, children: [] },
};
const itemsWithOrphanTask = {
  ...items,
  item5: { _id: 'item5', isProject: false, isCompleted: false, tags: [] },
};
const itemsWithProjectWithoutChildren = {
  ...items,
  item5: { _id: 'item5', isProject: true, children: [] },
  root: { _id: 'root', isProject: true, children: ['item5'] },
};
const itemsWithOrphanProject = {
  ...items,
  item5: { _id: 'item5', isProject: true, children: [] },
};
const itemsWithProjectWithChildren = {
  ...items,
  root: { _id: 'root', isProject: true, children: ['item4'] },
};

describe('itemsReducer', () => {
  it('returns the inital state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles DELETE_ITEM_POUCH correctly', () => {
    expect(reducer(items, actions.removeItemPouch({ _id: 'item3' }))).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
    });
  });
  it("handles DELETE_ITEM_POUCH correctly if the id doesn't exist", () => {
    expect(reducer(items, actions.removeItemPouch({ _id: 'item20' }))).toEqual(
      items
    );
  });
  it('handles DELETE_ITEM_WITHOUT_PARENT correctly', () => {
    expect(reducer(items, actions.deleteItemWithoutParent('item3'))).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
    });
  });
  it("handles DELETE_ITEM_WITHOUT_PARENT correctly if the id doesn't exist", () => {
    expect(reducer(items, actions.deleteItemWithoutParent('item20'))).toEqual(
      items
    );
  });
  it('handles INSERT_ITEM_POUCH correctly', () => {
    expect(
      reducer(
        items,
        actions.insertItemPouch({
          _id: 'item20',
          isProject: true,
          children: [],
        })
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
      item20: {
        _id: 'item20',
        isProject: true,
        children: [],
      },
    });
  });
  it('handles UPDATE_ITEM_POUCH correctly', () => {
    expect(
      reducer(
        items,
        actions.updateItemPouch({
          _id: 'item2',
          isProject: false,
          isCompleted: false,
          tags: [],
        })
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: false, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
    });
  });
  it('handles CREATE_ITEM with a task correctly', () => {
    expect(
      reducer(
        items,
        actions.createTask('item4', {
          isProject: false,
          isCompleted: false,
          tags: [],
          name: 'A Task',
        })
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3', 'item5'],
      },
      item5: {
        _id: 'item5',
        isProject: false,
        isCompleted: false,
        tags: [],
        name: 'A Task',
      },
    });
  });
  it('handles CREATE_ITEM with a project correctly', () => {
    expect(
      reducer(
        items,
        actions.createProject('item4', {
          isProject: true,
          name: 'A Project',
          children: [],
        })
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3', 'item5'],
      },
      item5: {
        _id: 'item5',
        isProject: true,
        name: 'A Project',
        children: [],
      },
    });
  });
  it("handles CREATE_ITEM correctly when the parent is root and it doesn't exist", () => {
    expect(
      reducer(
        items,
        actions.createProject('root', {
          isProject: false,
          isCompleted: false,
          tags: [],
          name: 'A Task',
        })
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
      root: { _id: 'root', isProject: true, children: ['item5'] },
      item5: {
        _id: 'item5',
        isProject: false,
        isCompleted: false,
        tags: [],
        name: 'A Task',
      },
    });
  });
  it('handles CREATE_ITEM correctly when the parent is root and it does exist', () => {
    expect(
      reducer(
        itemsWithRoot,
        actions.createProject('root', {
          isProject: false,
          isCompleted: false,
          tags: [],
          name: 'A Task',
        })
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
      root: { _id: 'root', isProject: true, children: ['item5'] },
      item5: {
        _id: 'item5',
        isProject: false,
        isCompleted: false,
        tags: [],
        name: 'A Task',
      },
    });
  });
  it("handles CREATE_ITEM correctly when the parent is inbox and it doesn't exist", () => {
    expect(
      reducer(
        items,
        actions.createProject('inbox', {
          isProject: false,
          isCompleted: false,
          tags: [],
          name: 'A Task',
        })
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
      inbox: { _id: 'inbox', isProject: true, children: ['item5'] },
      item5: {
        _id: 'item5',
        isProject: false,
        isCompleted: false,
        tags: [],
        name: 'A Task',
      },
    });
  });
  it('handles CREATE_ITEM correctly when the parent is inbox and it does exist', () => {
    expect(
      reducer(
        itemsWithInbox,
        actions.createProject('inbox', {
          isProject: false,
          isCompleted: false,
          tags: [],
          name: 'A Task',
        })
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
      inbox: { _id: 'inbox', isProject: true, children: ['item5'] },
      item5: {
        _id: 'item5',
        isProject: false,
        isCompleted: false,
        tags: [],
        name: 'A Task',
      },
    });
  });
  it('handles COMPLETE_ITEM correctly', () => {
    expect(reducer(items, actions.completeItem('item3', true))).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: true, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
    });
  });
  it("handles COMPLETE_ITEM correctly if the id doesn't exist", () => {
    expect(reducer(items, actions.completeItem('item30', true))).toEqual(items);
  });
  it('handles DELETE_ITEM correctly with a task', () => {
    expect(reducer(items, actions.deleteItem('item4', 'item3'))).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2'],
      },
    });
  });
  it("handles DELETE_ITEM correctly with a task if the task to delete is not in the parent's children", () => {
    expect(
      reducer(itemsWithOrphanTask, actions.deleteItem('item4', 'item5'))
    ).toEqual(itemsWithOrphanTask);
  });
  it('handles DELETE_ITEM correctly with a project', () => {
    expect(
      reducer(
        itemsWithProjectWithoutChildren,
        actions.deleteItem('root', 'item5')
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
      root: { _id: 'root', isProject: true, children: [] },
    });
  });
  it("handles DELETE_ITEM correctly with a project if the project to delete is not in the parent's children", () => {
    expect(
      reducer(itemsWithOrphanProject, actions.deleteItem('item4', 'item5'))
    ).toEqual(itemsWithOrphanProject);
  });
  it('handles DELETE_ITEM correctly with a project if the project to delete has children', () => {
    expect(
      reducer(itemsWithProjectWithChildren, actions.deleteItem('root', 'item4'))
    ).toEqual(itemsWithProjectWithChildren);
  });
  it('handles UPDATE_ITEM correctly with a task', () => {
    expect(
      reducer(
        items,
        actions.updateItem({
          _id: 'item2',
          isCompleted: true,
          tags: ['@tag'],
          name: 'Some Task',
        })
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: {
        _id: 'item2',
        isProject: false,
        isCompleted: true,
        tags: ['@tag'],
        name: 'Some Task',
      },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3'],
      },
    });
  });
  it('handles UPDATE_ITEM correctly with a project', () => {
    expect(
      reducer(items, actions.updateItem({ _id: 'item4', name: 'Some Project' }))
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        name: 'Some Project',
        children: ['item1', 'item2', 'item3'],
      },
    });
  });
  it('handles MOVE_ITEM correctly if the item to do move does not exist', () => {
    expect(
      reducer(items, actions.moveItem('item20', 'item1', 'item2'))
    ).toEqual(items);
  });
  it('handles MOVE_ITEM correctly if the previousParent does not exist', () => {
    expect(
      reducer(itemsWithRoot, actions.moveItem('item1', 'item21', 'item2'))
    ).toEqual(itemsWithRoot);
  });
  it('handles MOVE_ITEM correctly if the newParent does not exist', () => {
    expect(
      reducer(itemsWithRoot, actions.moveItem('item1', 'item2', 'item22'))
    ).toEqual(itemsWithRoot);
  });
  it('handles MOVE_ITEM correctly if the newParent does not exist', () => {
    expect(
      reducer(itemsWithRoot, actions.moveItem('item1', 'item2', 'item22'))
    ).toEqual(itemsWithRoot);
  });
  it('handles MOVE_ITEM correctly if the newParent is not a project', () => {
    expect(
      reducer(itemsWithRoot, actions.moveItem('item1', 'item4', 'item2'))
    ).toEqual(itemsWithRoot);
  });
  it('handles MOVE_ITEM correctly if the previousParent is not a project', () => {
    expect(
      reducer(itemsWithRoot, actions.moveItem('item1', 'item2', 'item4'))
    ).toEqual(itemsWithRoot);
  });
  it('handles MOVE_ITEM correctly if the id is not a child of previousParent', () => {
    expect(
      reducer(itemsWithRoot, actions.moveItem('item1', 'root', 'item4'))
    ).toEqual(itemsWithRoot);
  });
  it('handles MOVE_ITEM correctly if the previousParent is the same as the newParent', () => {
    expect(
      reducer(itemsWithRoot, actions.moveItem('item1', 'root', 'root'))
    ).toEqual(itemsWithRoot);
  });
  it('handles MOVE_ITEM correctly if the id is a child of previousParent and the newParent is a project', () => {
    expect(
      reducer(itemsWithRoot, actions.moveItem('item2', 'item4', 'root'))
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item3'],
      },
      root: { _id: 'root', isProject: true, children: ['item2'] },
    });
  });
  it('handles MOVE_ITEM_WITHOUT_PARENT if the item to do move exists and the newParent exists and is a project', () => {
    expect(
      reducer(
        itemsWithOrphanTask,
        actions.moveItemWithoutParent('item5', 'item4')
      )
    ).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item1', 'item2', 'item3', 'item5'],
      },
      item5: { _id: 'item5', isProject: false, isCompleted: false, tags: [] },
    });
  });
  it('handles MOVE_ITEM_WITHOUT_PARENT if the item to do move does not exist', () => {
    expect(
      reducer(
        itemsWithOrphanTask,
        actions.moveItemWithoutParent('item6', 'item4')
      )
    ).toEqual(itemsWithOrphanTask);
  });
  it('handles MOVE_ITEM_WITHOUT_PARENT if the newParent does not exist', () => {
    expect(
      reducer(
        itemsWithOrphanTask,
        actions.moveItemWithoutParent('item5', 'item7')
      )
    ).toEqual(itemsWithOrphanTask);
  });
  it('handles MOVE_ITEM_WITHOUT_PARENT if the newParent is not a project', () => {
    expect(
      reducer(
        itemsWithOrphanTask,
        actions.moveItemWithoutParent('item5', 'item3')
      )
    ).toEqual(itemsWithOrphanTask);
  });
  it('handles REORDER_ITEM if the newIndex is the same as the oldIndex', () => {
    expect(reducer(items, actions.reorderItem('item4', 2, 2))).toEqual(items);
  });
  it('handles REORDER_ITEM if the newIndex is different to the oldIndex', () => {
    expect(reducer(items, actions.reorderItem('item4', 2, 0))).toEqual({
      item1: { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
      item2: { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
      item3: { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
      item4: {
        _id: 'item4',
        isProject: true,
        children: ['item3', 'item1', 'item2'],
      },
    });
  });
});
