import React, { Component } from 'react';
import AddItem from './components/AddItem';

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
      <div>
        <h1>Oak</h1>
        <AddItem onAdd={this.logAddItem} />
      </div>
    );
  }
}

export default App;
