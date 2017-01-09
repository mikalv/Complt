import React from 'react';
import { mount } from 'enzyme';
import { Inbox } from '../Inbox';
import MuiTheme from '../../MuiTheme';

describe('Inbox component', () => {
  it('renders without crashing', () => {
    mount(<MuiTheme>
      <Inbox data={{ inbox: [], loading: false }} />
    </MuiTheme>);
  });
});
