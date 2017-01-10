import React from 'react';
import { mount } from 'enzyme';
import AddItem from '../AddItem';

describe('AddItem component', () => {
  it('renders without crashing', () => {
    mount(<AddItem onAddItem={jest.fn()} />);
  });
});
