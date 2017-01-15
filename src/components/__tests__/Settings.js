import React from 'react';
import { mount } from 'enzyme';
import { Settings } from '../Settings';

jest.mock('pouchdb/lib/index-browser');

describe('Root component', () => {
  it('renders without crashing', () => {
    mount(<Settings />);
  });
});
