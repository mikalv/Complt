import React from 'react';
import { shallow } from 'enzyme';
import { App, navItemsWithActive } from '../App';

const dialogs = {
  updateItem: {
    visible: false,
  },
  moveItem: {
    visible: false,
  },
};

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<App location={{ pathname: '/inbox' }} toasts={[]} dialogs={dialogs}><div /></App>);
  });
  it('renders correctly when the pathname matches a route', () => {
    const component = shallow(<App location={{ pathname: '/inbox' }} toasts={[]} dialogs={dialogs}><div /></App>);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly when the pathname does not match a route', () => {
    const component = shallow(<App location={{ pathname: '/some/path/that/does/not/exist' }} toasts={[]} dialogs={dialogs}><div /></App>);
    expect(component).toMatchSnapshot();
  });
  describe('navItemsWithActive()', () => {
    it('returns the same array if none of the to properties = the route', () => {
      const items = [{ to: '/inbox' }, { to: '/projects' }, { to: '/account' }];
      expect(navItemsWithActive(items, '/some/path/that/does/not/exist')).toEqual(items);
    });
    it('returns an array with the active property on the objects that have the same path as the current path', () => {
      const items = [{ to: '/inbox' }, { to: '/projects' }, { to: '/account' }];
      const expectedItems = [{ to: '/inbox', active: true }, { to: '/projects' }, { to: '/account' }];
      expect(navItemsWithActive(items, '/inbox')).toEqual(expectedItems);
    });
  });
});
