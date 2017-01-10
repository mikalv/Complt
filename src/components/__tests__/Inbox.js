import React from 'react';
import { mount } from 'enzyme';
import { Inbox } from '../Inbox';

describe('Inbox component', () => {
  it('renders without crashing', () => {
    mount(<Inbox data={{ inbox: [], loading: false }} />);
  });
});
