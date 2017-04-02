import React from 'react';
import { mount } from 'enzyme';
import ItemList from '../ItemList';

const task = { name: 'Task', isProject: false, isCompleted: false };
const project = { name: 'Project', isProject: true };

describe('ItemList component', () => {
  it('renders without crashing with no items', () => {
    mount(<ItemList />);
  });
  it('renders without crashing when an item is null', () => {
    mount(<ItemList items={[null]} />);
  });
  it('renders an item correctly', () => {
    const component = mount(<ItemList canMove items={[task]} />);
    expect(component).toMatchSnapshot();
  });
  it('calls onDelete correctly with a task', () => {
    const onDelete = jest.fn();
    const component = mount(<ItemList
      canDeleteTask
      onDelete={onDelete}
      items={[project, task, project]}
    />);
    component.childAt(2).find('MdDelete').simulate('click');
    expect(onDelete).toBeCalledWith(1);
  });
  it('calls onDelete correctly with a project', () => {
    const onDelete = jest.fn();
    const component = mount(<ItemList
      canDeleteProject
      onDelete={onDelete}
      items={[project, task, project]}
    />);
    component.childAt(4).find('MdDelete').simulate('click');
    expect(onDelete).toBeCalledWith(2);
  });
  it('calls onItemTap correctly', () => {
    const onItemTap = jest.fn();
    const component = mount(<ItemList
      onItemTap={onItemTap}
      items={[project, task, project]}
    />);
    component.childAt(4).find('.Item-center').simulate('click');
    expect(onItemTap).toBeCalledWith(2);
  });
  it('calls onLeftButtonClick correctly', () => {
    const onLeftButtonClick = jest.fn();
    const component = mount(<ItemList
      onLeftButtonClick={onLeftButtonClick}
      items={[project, task, project]}
    />);
    component.childAt(4).find('.Item-left').find('button').simulate('click');
    expect(onLeftButtonClick).toBeCalledWith(2);
  });
  it('calls onItemUpdate correctly', () => {
    const onItemUpdate = jest.fn();
    const component = mount(<ItemList
      onItemUpdate={onItemUpdate}
      items={[project, task, project]}
    />);
    component.childAt(4).find('MdCreate').simulate('click');
    expect(onItemUpdate).toBeCalledWith(2);
  });
  it('calls onItemMove correctly', () => {
    const onItemMove = jest.fn();
    const component = mount(<ItemList
      onItemMove={onItemMove}
      canMove
      items={[project, task, project]}
    />);
    component.childAt(4).find('MdMoreVert').simulate('click');
    expect(onItemMove).toBeCalledWith(2);
  });
});
