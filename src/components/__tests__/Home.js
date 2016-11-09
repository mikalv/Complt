import React from 'react';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from '../Home';
import MuiTheme from '../../MuiTheme';

injectTapEventPlugin();

describe('Home component', () => {
  it('renders without crashing', () => {
    mount(<MuiTheme><Home /></MuiTheme>);
  });
});
