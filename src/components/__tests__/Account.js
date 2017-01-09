import React from 'react';
import { mount } from 'enzyme';
import { Account } from '../Account';
import MuiTheme from '../../MuiTheme';

describe('Account component', () => {
  it('renders without crashing', () => {
    mount(<Account data={{ user: {}, loading: false }} />);
  });
});
