import React from 'react';
import { mount } from 'enzyme';
import ItemList from '../ItemList';

const task = { name: 'Task', __typename: 'Task', isCompleted: false };
const project = { name: 'Project', __typename: 'Project' };

describe('ItemList component', () => {
  it('renders without crashing with no items', () => {
    mount(<ItemList />);
  });
  it('renders without crashing when an item is null', () => {
    mount(<ItemList items={[null]} />);
  });
  it('renders an item correctly', () => {
    const component = mount(<ItemList items={[task]} />);
    expect(component).toMatchSnapshot();
  });
  it('calls onDelete correctly with a task', () => {
    const onDelete = jest.fn();
    const component = mount(<ItemList
      canDeleteTask
      onDelete={onDelete}
      items={[project, task, project]}
    />);
    component.childAt(1).find('Button').simulate('click');
    expect(onDelete).toBeCalledWith(1);
  });
  it('calls onDelete correctly with a project', () => {
    const onDelete = jest.fn();
    const component = mount(<ItemList
      canDeleteProject
      onDelete={onDelete}
      items={[project, task, project]}
    />);
    component.childAt(2).find('Button').simulate('click');
    expect(onDelete).toBeCalledWith(2);
  });
  it('calls onItemTap correctly', () => {
    const onItemTap = jest.fn();
    const component = mount(<ItemList
      onItemTap={onItemTap}
      items={[project, task, project]}
    />);
    component.childAt(2).find('ListItemText').simulate('click');
    expect(onItemTap).toBeCalledWith(2);
  });
  it('calls onItemAvatarTap correctly', () => {
    const onItemAvatarTap = jest.fn();
    const component = mount(<ItemList
      onItemAvatarTap={onItemAvatarTap}
      items={[project, task, project]}
    />);
    component.childAt(2).find('Avatar').simulate('click');
    expect(onItemAvatarTap).toBeCalledWith(2);
  });
});
