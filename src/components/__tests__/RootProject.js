import React from 'react';
import { mount } from 'enzyme';
import { RootProject } from '../RootProject';
import MuiTheme from '../../MuiTheme';

describe('Root component', () => {
  it('renders without crashing', () => {
    mount(<MuiTheme>
      <RootProject data={{ root: [], loading: false }} />
    </MuiTheme>);
  });
});
