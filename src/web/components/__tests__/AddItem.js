import React from 'react';
import { mount } from 'enzyme';
import AddItem from '../AddItem';

describe('AddItem component', () => {
  it('renders without crashing', () => {
    mount(<AddItem onAddItem={jest.fn()} />);
  });
  it('renders correctly when initialIsProject is false', () => {
    const component = mount(<AddItem onAddItem={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly when initialIsProject is true', () => {
    const component = mount(<AddItem onAddItem={jest.fn()} initialIsProject />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly when canChangeType is true and initialIsProject is false', () => {
    const component = mount(<AddItem onAddItem={jest.fn()} canChangeType />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly when canChangeType is true and initialIsProject is true', () => {
    const component = mount(<AddItem onAddItem={jest.fn()} canChangeType initialIsProject />);
    expect(component).toMatchSnapshot();
  });
  it('correctly changes between types when the button is clicked', () => {
    const component = mount(<AddItem onAddItem={jest.fn()} canChangeType />);
    const changeTypeButton = component.find('MdAssignment');
    expect(changeTypeButton.is('MdAssignment')).toEqual(true);
    changeTypeButton.simulate('click');
    expect(changeTypeButton.is('MdAssignment')).toEqual(false);
  });
  it('correctly updates the value when the input changes', () => {
    const component = mount(<AddItem onAddItem={jest.fn()} canChangeType />);
    const TextField = component.find('TextField');
    const input = component.find('input').first();
    input.simulate('change', { target: { value: 'Task @tag' } });
    expect(TextField.props().value).toEqual('Task @tag');
  });
  it('correctly adds a @ when the tag button is clicked', () => {
    const component = mount(<AddItem onAddItem={jest.fn()} canChangeType />);
    const TextField = component.find('TextField');
    const input = component.find('input').first();
    input.simulate('change', { target: { value: 'Task' } });
    component.find('MdLabel').simulate('click');
    expect(TextField.props().value).toEqual('Task @');
  });
  it('correctly calls onAddItem when the form is submitted', () => {
    const onAddItem = jest.fn();
    const component = mount(<AddItem onAddItem={onAddItem} canChangeType />);
    const input = component.find('input').first();
    input.simulate('change', { target: { value: 'Task @tag' } });
    component.find({ type: 'submit' }).simulate('submit');
    expect(onAddItem).toBeCalledWith({ isProject: false, tags: ['@tag'], name: 'Task', isCompleted: false, dates: [] });
  });
  it('does\'t call AddItem if the item returned from processItem is falsy', () => {
    const onAddItem = jest.fn();
    const component = mount(<AddItem onAddItem={onAddItem} canChangeType />);
    const input = component.find('input').first();
    input.simulate('change', { target: { value: '@tag' } });
    component.find({ type: 'submit' }).simulate('submit');
    expect(onAddItem).not.toBeCalled();
  });
});
