import React from 'react';
import renderer from 'react-test-renderer';
import { Login } from '../Login';
import MuiTheme from '../../MuiTheme';

describe('Login component', () => {
  it('renders without crashing', () => {
    renderer.create(<MuiTheme>
      <Login />
    </MuiTheme>);
  });
});
