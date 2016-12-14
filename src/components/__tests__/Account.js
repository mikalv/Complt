import React from 'react';
import renderer from 'react-test-renderer';
import { Account } from '../Account';
import MuiTheme from '../../MuiTheme';

describe('Account component', () => {
  it('renders without crashing', () => {
    renderer.create(<MuiTheme>
      <Account data={{ user: {}, loading: false }} />
    </MuiTheme>);
  });
});
