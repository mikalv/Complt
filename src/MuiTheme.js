import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pink500, pink700, tealA200 } from 'material-ui/styles/colors';

const MuiTheme = ({ children }) => (
  <MuiThemeProvider
    muiTheme={getMuiTheme({
      palette: {
        primary1Color: pink500,
        primary2Color: pink700,
        accent1Color: tealA200,
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
