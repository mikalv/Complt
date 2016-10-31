/* eslint-disable  no-undef */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pink500, pink700, tealA200 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import DrawerContent from './components/DrawerContent';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: pink500,
    primary2Color: pink700,
    accent1Color: tealA200,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      drawerDocked: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    window.setTimeout(() => {
      this.windowResize();
    }, 0);
    window.addEventListener('resize', () => {
      this.windowResize();
    });
  }
  toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }
  windowResize() {
    if (window.innerWidth >= 768) {
      this.setState({ drawerOpen: true, drawerDocked: true });
    } else {
      this.setState({ drawerOpen: false, drawerDocked: false });
    }
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>

          <Drawer
            docked={this.state.drawerDocked}
            onRequestChange={open => this.setState({ drawerOpen: open })}
            open={this.state.drawerOpen}
            swipeAreaWidth={50}
            zDepth={this.state.drawerDocked ? 0 : 2}
          ><DrawerContent /></Drawer>
          <AppBar
            title="Oak" className="drawer-margin"
            onLeftIconButtonTouchTap={this.toggleDrawer}
            iconElementLeft={this.state.drawerDocked ?
              <div /> : <IconButton disableTouchRipple><NavigationMenu /></IconButton>}
          />
          <div className="drawer-margin">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};
export default App;
