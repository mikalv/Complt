import React from 'react';
import { mount } from 'enzyme';
import { UpdateItemDialog, mapStateToProps, onSubmit, UpdateItemForm } from '../UpdateItemDialog';

describe('UpdateItemDialog component', () => {
  it('renders without crashing with a task', () => {
    mount(<UpdateItemDialog visible={false} item={{ isProject: false }} />);
  });
  it('renders without crashing with a project', () => {
    mount(<UpdateItemDialog visible={false} item={{ isProject: true }} />);
  });
  it('renders without crashing without an item', () => {
    mount(<UpdateItemDialog visible={false} />);
  });
});

describe('UpdateItemForm component', () => {
  it('renders without crashing', () => {
    mount(<UpdateItemForm item={{ name: 'thing', isProject: false }} />);
  });
});

describe('mapStateToProps', () => {
  it('returns an object with visible === false if state.dialogs.updateItem.visible is false', () => {
    expect(mapStateToProps({
      dialogs: { updateItem: { visible: false } },
    })).toEqual({ visible: false, defaultInputValue: '', item: {} });
  });
  it('returns an object with the correct properties if state.dialogs.updateItem.visible is true and the id of the item is update is a task', () => {
    expect(mapStateToProps({
      items: [{ _id: 'item1', isProject: true, name: 'item 1' }, { _id: 'item2', isProject: false, name: 'item 2', tags: ['@tag'] }, { _id: 'item3', isProject: true, name: 'item 3', tags: [] }],
      dialogs: { updateItem: { visible: true, id: 'item2' } },
    })).toEqual({
      defaultInputValue: 'item 2 @tag',
      item: { _id: 'item2', isProject: false, name: 'item 2', tags: ['@tag'] },
      visible: true,
    });
  });
  it('returns an object with the correct properties if state.dialogs.updateItem.visible is true and the id of the item is update is a task', () => {
    expect(mapStateToProps({
      items: [{ _id: 'item1', isProject: true, name: 'item 1' }, { _id: 'item2', isProject: false, name: 'item 2', tags: ['@tag'] }, { _id: 'item3', isProject: true, name: 'item 3', tags: ['@tag'] }],
      dialogs: { updateItem: { visible: true, id: 'item3' } },
    })).toEqual({
      defaultInputValue: 'item 3 @tag',
      item: { _id: 'item3', isProject: true, name: 'item 3', tags: ['@tag'] },
      visible: true,
    });
  });
});

describe('onSubmit', () => {
  it('calls handleUpdateItem correctly', () => {
    const handleUpdateItem = jest.fn();
    expect(onSubmit({ isProject: true }, handleUpdateItem)({ input: 'some input @tag' }));
    expect(handleUpdateItem).toBeCalledWith('some input @tag', { isProject: true });
  });
});
