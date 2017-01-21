import React from 'react';
import { mount } from 'enzyme';
import Item from '../Item';

describe('Item component', () => {
  it('renders correctly if it does not have an item', () => {
    const component = mount(<Item />);
    expect(component).toMatchSnapshot();
  });
  it('renders an uncompleted task correctly', () => {
    const component = mount(<Item item={{ name: 'Task', isProject: false, isCompleted: false }} />);
    expect(component).toMatchSnapshot();
  });
  it('renders a completed task correctly', () => {
    const component = mount(<Item item={{ name: 'Task', isProject: false, isCompleted: true }} />);
    expect(component).toMatchSnapshot();
  });
  it('renders a task with tags correctly', () => {
    const component = mount(<Item item={{ name: 'Task', isProject: false, isCompleted: false, tags: ['@tag', '@another-tag'] }} />);
    expect(component).toMatchSnapshot();
  });
  it('renders a project correctly', () => {
    const component = mount(<Item item={{ name: 'Project', isProject: true }} />);
    expect(component).toMatchSnapshot();
  });
  it('renders the delete button when it has the canDelete prop', () => {
    const component = mount(<Item canDelete item={{ name: 'Task', isProject: false, isCompleted: false }} />);
    expect(component).toMatchSnapshot();
  });
  it('only calls onDelete when the delete button is pressed', () => {
    const onItemTap = jest.fn();
    const onDelete = jest.fn();
    const component = mount(<Item canDelete onItemTap={onItemTap} onDelete={onDelete} item={{ name: 'Task', isProject: false, isCompleted: false }} />);
    component.find('MdDelete').simulate('click');
    expect(onItemTap).not.toBeCalled();
    expect(onDelete).toBeCalled();
  });
  it('only calls onItemUpdate when the update button is pressed', () => {
    const onItemTap = jest.fn();
    const onItemUpdate = jest.fn();
    const component = mount(<Item canDelete onItemTap={onItemTap} onItemUpdate={onItemUpdate} item={{ name: 'Task', isProject: false, isCompleted: false }} />);
    component.find('MdCreate').simulate('click');
    expect(onItemTap).not.toBeCalled();
    expect(onItemUpdate).toBeCalled();
  });
  it('only calls onItemMove when the move button is pressed', () => {
    const onItemTap = jest.fn();
    const onItemMove = jest.fn();
    const component = mount(<Item canDelete onItemTap={onItemTap} onItemMove={onItemMove} item={{ name: 'Task', isProject: false, isCompleted: false }} />);
    component.find('MdMoreVert').simulate('click');
    expect(onItemTap).not.toBeCalled();
    expect(onItemMove).toBeCalled();
  });
});
