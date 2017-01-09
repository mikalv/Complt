import React from 'react';
import { mount } from 'enzyme';
import Projects from '../Projects';
import MuiTheme from '../../MuiTheme';

describe('Projects component', () => {
  it('renders without crashing', () => {
    mount(<MuiTheme>
      <Projects projectChildren={[]} />
    </MuiTheme>);
  });
});
