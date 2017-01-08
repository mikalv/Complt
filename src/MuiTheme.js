import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pinkA200 } from 'material-ui/styles/colors';

const MuiTheme = ({ children }) => (
  <MuiThemeProvider
    muiTheme={getMuiTheme({
      palette: {
        primary1Color: '#59C9A5',
        accent1Color: pinkA200,
      },
    })}
  >
    {children}
  </MuiThemeProvider>
);

MuiTheme.propTypes = {
  children: React.PropTypes.node,
};

export default MuiTheme;
