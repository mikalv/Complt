import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui/List';
import AddItem from './components/AddItem';
import Item from './components/Item';

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
      <MuiThemeProvider>
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
