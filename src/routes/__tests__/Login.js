import React from 'react';
import { mount } from 'enzyme';
import { Login } from '../Login';

describe('Login component', () => {
  it('renders without crashing', () => {
    mount(<Login />);
  });
});
