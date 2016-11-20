import React from 'react';
import renderer from 'react-test-renderer';
import { App } from '../App';

describe('App component', () => {
  it('renders without crashing', () => {
    renderer.create(<App drawer={{ isOpen: false, isDocked: false }} dockDrawer={() => {}} />);
  });
  it('calls dockDrawer function initally', () => {
    const dockDrawer = jest.fn();
    renderer.create(<App drawer={{ isOpen: false, isDocked: false }} dockDrawer={dockDrawer} />);
    expect(dockDrawer).toBeCalled();
  });
  it('renders correctly when the drawer is open and undocked', () => {
    const component = renderer.create(
      <App drawer={{ isOpen: true, isDocked: false }} dockDrawer={() => {}} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when the drawer is closed and undocked', () => {
    const component = renderer.create(
      <App drawer={{ isOpen: false, isDocked: false }} dockDrawer={() => {}} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when the drawer is docked', () => {
    const component = renderer.create(
      <App drawer={{ isOpen: true, isDocked: true }} dockDrawer={() => {}} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
