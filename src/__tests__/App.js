import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe('Home component', () => {
  it('renders without crashing', () => {
    mount(<App />);
  });
});
