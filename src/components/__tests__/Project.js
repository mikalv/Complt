import React from 'react';
import { mount } from 'enzyme';
import { Project } from '../Project';
import MuiTheme from '../../MuiTheme';

describe('Project component', () => {
  it('renders without crashing', () => {
    mount(<MuiTheme>
      <Project data={{ itemById: { children: [] }, loading: false }} />
    </MuiTheme>);
  });
});
