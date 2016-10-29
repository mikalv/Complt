import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pink500, pink700, tealA200 } from 'material-ui/styles/colors';
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
    };
    this.logAddItem = this.logAddItem.bind(this);
  }
  logAddItem(item) {
    const items = this.state.items;
    items.push(item);
    this.setState({ items });
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <h1>Oak</h1>
          <AddItem onAdd={this.logAddItem} />
          <br />
          <List>
            {this.state.items.map((item, i) => <Item key={i} item={item} />)}
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
