import React from 'react';
import { mount } from 'enzyme';
import Item from '../Item';

describe('Item component', () => {
  it('renders an uncompleted task correctly', () => {
    const component = mount(<Item item={{ name: 'Task', __typename: 'Task', isCompleted: false }} />);
    expect(component).toMatchSnapshot();
  });
  it('renders a completed task correctly', () => {
    const component = mount(<Item item={{ name: 'Task', __typename: 'Task', isCompleted: true }} />);
    expect(component).toMatchSnapshot();
  });
  it('renders a task with tags correctly', () => {
    const component = mount(<Item item={{ name: 'Task', __typename: 'Task', isCompleted: false, tags: ['@tag', '@another-tag'] }} />);
    expect(component).toMatchSnapshot();
  });
  it('renders a project correctly', () => {
    const component = mount(<Item item={{ name: 'Project', __typename: 'Project' }} />);
    expect(component).toMatchSnapshot();
  });
  it('renders the delete button when it has the canDelete prop', () => {
    const component = mount(<Item canDelete item={{ name: 'Task', __typename: 'Task', isCompleted: false }} />);
    expect(component).toMatchSnapshot();
  });
  it('only calls onDelete when the delete button is pressed', () => {
    const onItemTap = jest.fn();
    const onDelete = jest.fn();
    const component = mount(<Item canDelete onItemTap={onItemTap} onDelete={onDelete} item={{ name: 'Task', __typename: 'Task', isCompleted: false }} />);
    component.find('Button').simulate('click');
    expect(onItemTap).not.toBeCalled();
    expect(onDelete).toBeCalled();
  });
});
