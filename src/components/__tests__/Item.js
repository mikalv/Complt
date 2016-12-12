import React from 'react';
import renderer from 'react-test-renderer';
import Item from '../Item';
import MuiTheme from '../../MuiTheme';

describe('Item component', () => {
  it('renders an uncompleted task correctly', () => {
    const component = renderer.create(<MuiTheme>
      <Item item={{ name: 'Task', __typename: 'Task', isCompleted: false }} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a completed task correctly', () => {
    const component = renderer.create(<MuiTheme>
      <Item item={{ name: 'Task', __typename: 'Task', isCompleted: true }} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a task with tags correctly', () => {
    const component = renderer.create(<MuiTheme>
      <Item item={{ name: 'Task', __typename: 'Task', isCompleted: false, tags: ['@tag', '@another-tag'] }} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a project correctly', () => {
    const component = renderer.create(<MuiTheme>
      <Item item={{ name: 'Project', __typename: 'Project' }} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the delete button when it has the canDelete prop', () => {
    const component = renderer.create(<MuiTheme>
      <Item canDelete item={{ name: 'Task', __typename: 'Task', isCompleted: false }} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
