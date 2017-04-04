import React from 'react';
import { mount } from 'enzyme';
import SortableElement from 'react-sortable-hoc/dist/es6/SortableElement';
import SortableContainer from 'react-sortable-hoc/dist/es6/SortableContainer';

jest.mock('react-sortable-hoc/dist/es6/SortableElement')
.mock('react-sortable-hoc/dist/es6/SortableContainer');

SortableElement.mockImplementation(component => component);
SortableContainer.mockImplementation(component => component);

const { Projects, mapStateToProps } = require('../Projects');

const task = { name: 'Task', isProject: false, isCompleted: false, tags: ['@tag'] };
const project = { name: 'Project', isProject: true };

const items = [
  { ...task, _id: 'item1' },
  { ...project, _id: 'item2' },
  { ...task, _id: 'item3' },
];

describe('Projects component', () => {
  it('renders without crashing with no projectChildren', () => {
    mount(<Projects projectChildren={[]} />);
  });
  it('renders correctly with some items', () => {
    const component = mount(<Projects projectChildren={items} />);
    expect(component).toMatchSnapshot();
  });
  it('calls deleteItem when a project is deleted', () => {
    const deleteItem = jest.fn();
    const component = mount(<Projects projectChildren={items} deleteItem={deleteItem} projectId="root" />);
    component.childAt(0).childAt(2).find('MdDelete').simulate('click');
    expect(deleteItem).toBeCalledWith('root', 'item2');
  });
  it('calls deleteItem when a task is deleted', () => {
    const deleteItem = jest.fn();
    const component = mount(<Projects projectChildren={items} deleteItem={deleteItem} projectId="root" />);
    component.childAt(0).childAt(4).find('MdDelete').simulate('click');
    expect(deleteItem).toBeCalledWith('root', 'item3');
  });
  it('calls showUpdateItemDialog when an item is updated', () => {
    const showUpdateItemDialog = jest.fn();
    const component = mount(<Projects projectChildren={items} showUpdateItemDialog={showUpdateItemDialog} projectId="root" />);
    component.childAt(0).childAt(4).find('MdCreate').simulate('click');
    expect(showUpdateItemDialog).toBeCalledWith('item3');
  });
  it('calls showUpdateItemDialog when an item is updated', () => {
    const showMoveItemDialog = jest.fn();
    const component = mount(<Projects projectChildren={items} showMoveItemDialog={showMoveItemDialog} projectId="root" />);
    component.childAt(0).childAt(4).find('MdMoreVert').simulate('click');
    expect(showMoveItemDialog).toBeCalledWith('item3', 'root');
  });
  it('calls completeItem correctly when an item is completed', () => {
    const completeItem = jest.fn();
    const component = mount(<Projects projectChildren={items} completeItem={completeItem} projectId="root" />);
    component.childAt(0).childAt(4).find('.Item-left').find('button')
    .simulate('click');
    expect(completeItem).toBeCalledWith('item3', true);
  });
  it('calls routerPush correctly when a project is clicked', () => {
    const routerPush = jest.fn();
    const component = mount(<Projects projectChildren={items} routerPush={routerPush} projectId="root" />);
    component.childAt(0).childAt(2).find('.Item-center').simulate('click');
    expect(routerPush).toBeCalledWith('/project/item2');
  });
  it('calls createProject when a project is created', () => {
    const createProject = jest.fn();
    const component = mount(<Projects projectChildren={items} initialIsProject createProject={createProject} projectId="root" />);
    const input = component.find('input').first();
    input.simulate('change', { target: { value: 'Some Project @tag' } });
    component.find({ type: 'submit' }).simulate('submit');
    expect(createProject).toBeCalledWith('root', { name: 'Some Project', isProject: true, children: [], isCompleted: false, tags: ['@tag'], dates: [] });
  });
  it('calls createTask when a task is created', () => {
    const createTask = jest.fn();
    const component = mount(<Projects projectChildren={items} createTask={createTask} projectId="root" />);
    const input = component.find('input').first();
    input.simulate('change', { target: { value: 'Some Task @tag' } });
    component.find({ type: 'submit' }).simulate('submit');
    expect(createTask).toBeCalledWith('root', { name: 'Some Task', isProject: false, isCompleted: false, tags: ['@tag'], dates: [] });
  });
});

const state = {
  items: [
    { ...task, _id: 'item1' },
    { ...project, _id: 'item2' },
    { ...task, _id: 'item3' },
    { ...project, _id: 'item4', children: ['item1', 'item2', 'item3'] },
  ],
};

describe('mapStateToProps', () => {
  it('returns an object with a projectChildren property with an empty array if the project does not exist', () => {
    expect(mapStateToProps(state, { projectId: 'item5' })).toEqual({ projectChildren: [] });
  });
  it('returns an object with a projectChildren property with an array of the items children', () => {
    expect(mapStateToProps(state, { projectId: 'item4' })).toEqual({ projectChildren: [
      { _id: 'item1', name: 'Task', isProject: false, isCompleted: false, tags: ['@tag'] },
      { _id: 'item2', name: 'Project', isProject: true },
      { _id: 'item3', name: 'Task', isProject: false, isCompleted: false, tags: ['@tag'] },
    ] });
  });
});
