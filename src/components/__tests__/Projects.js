import React from 'react';
import { mount } from 'enzyme';
import Projects from '../Projects';

describe('Projects component', () => {
  it('renders without crashing', () => {
    mount(<Projects projectChildren={[]} />);
  });
});
