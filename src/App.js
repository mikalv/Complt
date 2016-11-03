/* eslint-disable  no-undef */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import DrawerContent from './components/DrawerContent';
import MuiTheme from './MuiTheme';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      drawerDocked: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  componentWillMount() {
    this.windowResize();
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
      <MuiTheme>
        <div>
          <Drawer
            docked={this.state.drawerDocked}
            onRequestChange={open => this.setState({ drawerOpen: open })}
            open={this.state.drawerOpen}
            swipeAreaWidth={50}
            zDepth={this.state.drawerDocked ? 0 : 2}
          ><DrawerContent onLocationTap={this.toggleDrawer} /></Drawer>
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
      </MuiTheme>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};
export default App;
