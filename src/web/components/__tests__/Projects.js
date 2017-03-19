import React from 'react';
import { mount } from 'enzyme';
import { Projects, mapStateToProps } from '../Projects';

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
  it('calls deleteProject when a project is deleted', () => {
    const deleteProject = jest.fn();
    const component = mount(<Projects projectChildren={items} deleteProject={deleteProject} projectId="root" />);
    component.childAt(0).childAt(1).find('MdDelete').simulate('click');
    expect(deleteProject).toBeCalledWith('root', 'item2');
  });
  it('calls deleteTask when a task is deleted', () => {
    const deleteTask = jest.fn();
    const component = mount(<Projects projectChildren={items} deleteTask={deleteTask} projectId="root" />);
    component.childAt(0).childAt(2).find('MdDelete').simulate('click');
    expect(deleteTask).toBeCalledWith('root', 'item3');
  });
  it('calls showUpdateItemDialog when an item is updated', () => {
    const showUpdateItemDialog = jest.fn();
    const component = mount(<Projects projectChildren={items} showUpdateItemDialog={showUpdateItemDialog} projectId="root" />);
    component.childAt(0).childAt(2).find('MdCreate').simulate('click');
    expect(showUpdateItemDialog).toBeCalledWith('item3');
  });
  it('calls showUpdateItemDialog when an item is updated', () => {
    const showMoveItemDialog = jest.fn();
    const component = mount(<Projects projectChildren={items} showMoveItemDialog={showMoveItemDialog} projectId="root" />);
    component.childAt(0).childAt(2).find('MdMoreVert').simulate('click');
    expect(showMoveItemDialog).toBeCalledWith('item3', 'root');
  });
  it('calls completeItem correctly when an item is completed', () => {
    const completeItem = jest.fn();
    const component = mount(<Projects projectChildren={items} completeItem={completeItem} projectId="root" />);
    component.childAt(0).childAt(2).find('Avatar').simulate('click');
    expect(completeItem).toBeCalledWith('item3', true);
  });
  it('calls routerPush correctly when a project is clicked', () => {
    const routerPush = jest.fn();
    const component = mount(<Projects projectChildren={items} routerPush={routerPush} projectId="root" />);
    component.childAt(0).childAt(1).find('li').find('AccessibleFakeButtonInked')
    .simulate('click');
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
