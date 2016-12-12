import React from 'react';
import renderer from 'react-test-renderer';
import ItemList from '../ItemList';
import MuiTheme from '../../MuiTheme';

const task = { name: 'Task', __typename: 'Task', isCompleted: false };
const project = { name: 'Project', __typename: 'Project' };

describe('ItemList component', () => {
  it('renders without crashing with no items', () => {
    const component = renderer.create(<MuiTheme>
      <ItemList />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders without crashing when an item is null', () => {
    const component = renderer.create(<MuiTheme>
      <ItemList items={[null]} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders an item correctly', () => {
    const component = renderer.create(<MuiTheme>
      <ItemList items={[task]} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('passes the canDelete prop to the Item component if the item is a task and the component has the canDeleteTask prop', () => {
    const component = renderer.create(<MuiTheme>
      <ItemList canDeleteTask items={[task]} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('passes the canDelete prop to the Item component if the item is a project and the component has the canDeleteProject prop', () => {
    const component = renderer.create(<MuiTheme>
      <ItemList canDeleteProject items={[project]} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('passes the onItemAvatarTap function to the Item component', () => {
    const component = renderer.create(<MuiTheme>
      <ItemList onItemAvatarTap={jest.fn()} items={[task]} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('passes the onItemTap function to the Item component', () => {
    const component = renderer.create(<MuiTheme>
      <ItemList onItemTap={jest.fn()} items={[task]} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
