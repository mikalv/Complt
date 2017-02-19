import React from 'react-native';
import { mount } from 'enzyme';
import Chip from '../Chip';
import '../../configureStore';
import '../../RootNavigation';

describe('native Chip component', () => {
  it('renders without crashing', () => {
    mount(<Chip text="Some Text" />);
  });
});
