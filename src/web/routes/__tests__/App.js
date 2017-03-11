import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

const dialogs = {
  updateItem: {
    visible: false,
  },
  moveItem: {
    visible: false,
  },
};

const syncState = {
  syncing: false,
};

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<App location={{ pathname: '/inbox' }} toasts={[]} dialogs={dialogs} syncState={syncState} profile={{}}><div /></App>);
  });
  it('renders correctly when the pathname matches a route', () => {
    const component = shallow(<App location={{ pathname: '/inbox' }} toasts={[]} dialogs={dialogs} syncState={syncState} profile={{}}><div /></App>);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly when the pathname does not match a route', () => {
    const component = shallow(<App location={{ pathname: '/some/path/that/does/not/exist' }} toasts={[]} dialogs={dialogs} syncState={syncState} profile={{}}><div /></App>);
    expect(component).toMatchSnapshot();
  });
});
