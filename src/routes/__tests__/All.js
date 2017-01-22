import React from 'react';
import { mount } from 'enzyme';
import { All, mapStateToProps } from '../All';

const task = { name: 'Task', isProject: false, isCompleted: false, tags: ['@tag'] };
const project = { name: 'Project', isProject: true };

const items = [
  { ...task, _id: 'item1' },
  { ...project, _id: 'item2' },
  { ...task, _id: 'item3' },
];

const itemsWithRootAndInbox = [
  ...items,
  { ...project, _id: 'root' },
  { ...project, _id: 'inbox' },
];

describe('All component', () => {
  it('renders without crashing', () => {
    mount(<All />);
  });
  it('renders correctly', () => {
    const component = mount(<All projectChildren={items} />);
    expect(component).toMatchSnapshot();
  });
  it('calls completeTask correctly when a task is completed', () => {
    const completeTask = jest.fn();
    const component = mount(<All projectChildren={items} completeTask={completeTask} />);
    component.childAt(2).find('Avatar').simulate('click');
    expect(completeTask).toBeCalledWith('item3', true);
  });
  it('calls routerPush correctly when a project is clicked', () => {
    const routerPush = jest.fn();
    const component = mount(<All projectChildren={items} router={{ push: routerPush }} />);
    component.childAt(1).find('li').find('AccessibleFakeButtonInked')
    .simulate('click');
    expect(routerPush).toBeCalledWith('/project/item2');
  });
  it('calls showUpdateItemDialog when an item is updated', () => {
    const showUpdateItemDialog = jest.fn();
    const component = mount(<All
      projectChildren={items}
      showUpdateItemDialog={showUpdateItemDialog}
    />);
    component.childAt(2).find('MdCreate').simulate('click');
    expect(showUpdateItemDialog).toBeCalledWith('item3');
  });
});

describe('mapStateToProps', () => {
  it('returns an object with a projectChildren property which is an array of items without root or inbox', () => {
    expect(mapStateToProps({ items: itemsWithRootAndInbox })).toEqual({ projectChildren: items });
  });
});
