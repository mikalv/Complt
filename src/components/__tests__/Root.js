import React from 'react';
import renderer from 'react-test-renderer';
import { Root } from '../Root';
import MuiTheme from '../../MuiTheme';

describe('Root component', () => {
  it('renders without crashing', () => {
    renderer.create(<MuiTheme>
      <Root data={{ root: [], loading: false }} />
    </MuiTheme>);
  });
});
