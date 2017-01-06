import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { NavigationProvider } from '@exponent/ex-navigation';
import RootNavigation, { renderTitle, renderIcon } from '../RootNavigation';
import router from '../router';
import '../../main'; // importing to get coverage correctly

describe('RootNavigation', () => {
  it('renders without crashing', () => {
    renderer.create(<NavigationProvider router={router}><RootNavigation /></NavigationProvider>);
  });
  describe('renderTitle', () => {
    it('renders correctly when it\'s selected', () => {
      const component = renderer.create(renderTitle('Inbox', true));
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders correctly when it\'s not selected', () => {
      const component = renderer.create(renderTitle('Inbox', false));
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('renderIcon', () => {
    it('renders correctly when it\'s selected', () => {
      const component = renderer.create(renderIcon('inbox', true));
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders correctly when it\'s not selected', () => {
      const component = renderer.create(renderIcon('inbox', false));
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
