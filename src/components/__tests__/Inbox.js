import React from 'react';
import { mount } from 'enzyme';
import Inbox from '../Inbox';
import MuiTheme from '../../MuiTheme';

it('renders without crashing', () => {
  mount(<MuiTheme><Inbox /></MuiTheme>);
});
