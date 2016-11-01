import React from 'react';
import { mount } from 'enzyme';
import Inbox from '../Inbox';

it('renders without crashing', () => {
  mount(<Inbox />);
});
