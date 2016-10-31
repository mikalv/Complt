import React from 'react';
import { mount } from 'enzyme';
import AppRouter from '../AppRouter';

it('renders without crashing', () => {
  mount(<AppRouter />);
});
