import React from 'react';
import renderer from 'react-test-renderer';
import { Inbox } from '../Inbox';
import MuiTheme from '../../MuiTheme';

describe('Inbox component', () => {
  it('renders without crashing', () => {
    renderer.create(<MuiTheme>
      <Inbox data={{ inbox: [], loading: false }} />
    </MuiTheme>);
  });
});
