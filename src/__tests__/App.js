import React from 'react';
import renderer from 'react-test-renderer';
import { App } from '../App';
import MuiTheme from '../MuiTheme';

describe('App component', () => {
  it('renders without crashing', () => {
    renderer.create(<MuiTheme>
      <App drawer={{ isOpen: false, isDocked: false }} dockDrawer={() => {}} />
    </MuiTheme>);
  });
  it('calls dockDrawer function initally', () => {
    const dockDrawer = jest.fn();
    renderer.create(<MuiTheme>
      <App drawer={{ isOpen: false, isDocked: false }} dockDrawer={dockDrawer} />
    </MuiTheme>);
    expect(dockDrawer).toBeCalled();
  });
  it('renders correctly when the drawer is open and undocked', () => {
    const component = renderer.create(<MuiTheme>
      <App drawer={{ isOpen: true, isDocked: false }} dockDrawer={() => {}} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when the drawer is closed and undocked', () => {
    const component = renderer.create(<MuiTheme>
      <App drawer={{ isOpen: false, isDocked: false }} dockDrawer={() => {}} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when the drawer is docked', () => {
    const component = renderer.create(<MuiTheme>
      <App drawer={{ isOpen: true, isDocked: true }} dockDrawer={() => {}} />
    </MuiTheme>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
