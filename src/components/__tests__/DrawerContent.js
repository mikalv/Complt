import React from 'react';
import renderer from 'react-test-renderer';
import DrawerContent from '../DrawerContent';
import MuiTheme from '../../MuiTheme';

describe('DrawerContent component', () => {
  it('renders without crashing', () => {
    renderer.create(<MuiTheme>
      <DrawerContent />
    </MuiTheme>);
  });
});
