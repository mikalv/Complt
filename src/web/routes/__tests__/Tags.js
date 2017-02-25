import React from 'react';
import { mount } from 'enzyme';
import { Tags, mapStateToProps } from '../Tags';
import items from '../../exampleItems';

describe('Tags component', () => {
  it('renders without crashing', () => {
    mount(<Tags tags={[]} />);
  });
  it('renders some items correctly', () => {
    const component = mount(<Tags tags={mapStateToProps({ items }).tags} />);
    expect(component).toMatchSnapshot();
  });
});
