import React from 'react';
import renderer from 'react-test-renderer';
import { Projects } from '../Projects';
import MuiTheme from '../../MuiTheme';

describe('Projects component', () => {
  it('renders without crashing', () => {
    renderer.create(<MuiTheme>
      <Projects data={{ root: [], loading: false }} />
    </MuiTheme>);
  });
});
