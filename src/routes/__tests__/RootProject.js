import React from 'react';
import { mount } from 'enzyme';
import { RootProject } from '../RootProject';

describe('Root component', () => {
  it('renders without crashing', () => {
    mount(<RootProject data={{ root: [], loading: false }} />);
  });
});
