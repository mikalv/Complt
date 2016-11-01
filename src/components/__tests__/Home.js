import React from 'react';
import { mount } from 'enzyme';
import Home from '../Home';
import MuiTheme from '../../MuiTheme';

it('renders without crashing', () => {
  mount(<MuiTheme><Home /></MuiTheme>);
});
