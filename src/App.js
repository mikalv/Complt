/* eslint-disable  no-undef */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pink500, pink700, tealA200 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import AddItem from './components/AddItem';
import Item from './components/Item';

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
      items: [],
      drawerOpen: false,
      drawerDocked: false,
    };
    this.logAddItem = this.logAddItem.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    window.setTimeout(() => {
      this.windowResize();
    }, 0);
    window.addEventListener('resize', () => {
      this.windowResize();
    });
  }
  logAddItem(item) {
    const items = this.state.items;
    items.push(item);
    this.setState({ items });
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
          <AppBar
            title="Oak" className="drawer-margin"
            iconElementLeft={this.state.drawerDocked ?
              <div /> : <IconButton disableTouchRipple><NavigationMenu /></IconButton>}
          />
          <Drawer
            docked={this.state.drawerDocked}
            onRequestChange={open => this.setState({ drawerOpen: open })}
            open={this.state.drawerOpen}
            swipeAreaWidth={50}
          >Drawer</Drawer>
          <div className="container drawer-margin">
            <AddItem onAdd={this.logAddItem} />
            <br />
            <List>
              {this.state.items.map((item, i) => <Item key={i} item={item} />)}
            </List>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
