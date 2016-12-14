import React from 'react';
import renderer from 'react-test-renderer';
import AddItem from '../AddItem';
import MuiTheme from '../../MuiTheme';

describe('AddItem component', () => {
  it('renders without crashing', () => {
    renderer.create(<MuiTheme>
      <AddItem />
    </MuiTheme>);
  });
});
