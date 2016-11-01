import React from 'react';
import { mount } from 'enzyme';
import Home from '../Home';

it('renders without crashing', () => {
  mount(<Home />);
});
