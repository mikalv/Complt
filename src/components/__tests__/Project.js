import React from 'react';
import renderer from 'react-test-renderer';
import { Project } from '../Project';
import MuiTheme from '../../MuiTheme';

describe('Project component', () => {
  it('renders without crashing', () => {
    renderer.create(<MuiTheme>
      <Project data={{ itemById: { children: [] }, loading: false }} />
    </MuiTheme>);
  });
});
