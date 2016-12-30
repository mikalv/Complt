import React from 'react';
import renderer from 'react-test-renderer';
import { RootProject } from '../RootProject';
import MuiTheme from '../../MuiTheme';

describe('Root component', () => {
  it('renders without crashing', () => {
    renderer.create(<MuiTheme>
      <RootProject data={{ root: [], loading: false }} />
    </MuiTheme>);
  });
});
