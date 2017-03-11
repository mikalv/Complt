import React from 'react';
import { mount } from 'enzyme';
import NonProjectItemList from '../NonProjectItemList';

const task = { name: 'Task', isProject: false, isCompleted: false, tags: ['@tag'] };
const project = { name: 'Project', isProject: true };

const items = [
  { ...task, _id: 'item1' },
  { ...project, _id: 'item2' },
  { ...task, _id: 'item3' },
];

describe('NonProjectItemList component', () => {
  it('renders without crashing', () => {
    mount(<NonProjectItemList />);
  });
  it('renders correctly', () => {
    const component = mount(<NonProjectItemList items={items} />);
    expect(component).toMatchSnapshot();
  });
  it('calls completeItem correctly when an item is completed', () => {
    const completeItem = jest.fn();
    const component = mount(<NonProjectItemList
      items={items}
      completeItem={completeItem}
    />);
    component.childAt(2).find('Avatar').simulate('click');
    expect(completeItem).toBeCalledWith('item3', true);
  });
  it('calls routerPush correctly when a project is clicked', () => {
    const routerPush = jest.fn();
    const component = mount(<NonProjectItemList
      items={items}
      history={{ push: routerPush }}
    />);
    component.childAt(1).find('li').find('AccessibleFakeButtonInked')
    .simulate('click');
    expect(routerPush).toBeCalledWith('/project/item2');
  });
  it('calls showUpdateItemDialog when an item is updated', () => {
    const showUpdateItemDialog = jest.fn();
    const component = mount(<NonProjectItemList
      items={items}
      showUpdateItemDialog={showUpdateItemDialog}
    />);
    component.childAt(2).find('MdCreate').simulate('click');
    expect(showUpdateItemDialog).toBeCalledWith('item3');
  });
});
