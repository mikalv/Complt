import React from 'react';
import { mount } from 'enzyme';
import { MoveItemDialog, mapStateToProps, moveItem } from '../MoveItemDialog';
import itemsToTree from '../../../common/utils/itemsToTree';

jest.mock('../../../common/utils/itemsToTree');

const items = [
  { isProject: true, _id: 'root', children: ['item1', 'item2'] },
  { isProject: true, children: [], name: 'Some Project', _id: 'item1' },
  { isProject: true, children: [], name: 'Some Other Project', _id: 'item2' },
];

const tree = {
  isProject: true,
  _id: 'root',
  children: [
    { isProject: true, children: [], name: 'Some Project', _id: 'item1' },
    { isProject: true, children: [], name: 'Some Other Project', _id: 'item2' },
  ] };

itemsToTree.mockReturnValue(tree);


describe('UpdateItemDialog component', () => {
  it('renders without crashing', () => {
    mount(<MoveItemDialog dialog={{ visible: false }} itemTree={tree} />);
  });
});


describe('mapStateToProps', () => {
  it('calls itemsToTree correctly', () => {
    mapStateToProps({ dialogs: { moveItem: { visible: false } }, items });
    expect(itemsToTree).toBeCalledWith(items, 'root');
  });
});

describe('moveItem', () => {
  it('calls handleMoveItem correctly', () => {
    const handleMoveItem = jest.fn();
    expect(moveItem(handleMoveItem, 'someId', 'inbox')('root'));
    expect(handleMoveItem).toBeCalledWith('someId', 'inbox', 'root');
  });
});
