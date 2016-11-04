import React from 'react';
import { mount } from 'enzyme';
import Inbox from '../Inbox';
import MuiTheme from '../../MuiTheme';

describe('Inbox component', () => {
  it('renders without crashing', () => {
    global.window.localStorage = {};
    mount(<MuiTheme><Inbox /></MuiTheme>);
  });
});
