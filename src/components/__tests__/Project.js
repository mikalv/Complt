import React from 'react';
import { mount } from 'enzyme';
import { Project } from '../Project';

describe('Project component', () => {
  it('renders without crashing', () => {
    mount(<Project data={{ itemById: { children: [] }, loading: false }} />);
  });
});
