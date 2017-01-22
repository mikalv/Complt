import React from 'react';
import { mount } from 'enzyme';
import MoveItemList from '../MoveItemList';


const tree = {
  isProject: true,
  _id: 'root',
  children: [
    { isProject: true, children: [], name: 'Some Project', _id: 'item1' },
    { isProject: true, children: [], name: 'Some Other Project', _id: 'item2' },
    null,
    { isProject: false, isCompleted: false, tags: [], name: 'Some Task', _id: 'item3' },
  ] };

describe('UpdateItemDialog component', () => {
  it('renders correctly', () => {
    const component = mount(<MoveItemList itemTree={tree} itemToMove="item1" />);
    expect(component).toMatchSnapshot();
  });
  it('calls onChooseItem correctly', () => {
    const onChooseItem = jest.fn();
    const component = mount(<MoveItemList itemTree={tree} onChooseItem={onChooseItem} />);
    component.find('ListItemText').first().simulate('click');
    expect(onChooseItem).toBeCalledWith('root');
  });
});
