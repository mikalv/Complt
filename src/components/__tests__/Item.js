import React from 'react';
import { mount } from 'enzyme';
import Item from '../Item';

describe('Item component', () => {
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
});
