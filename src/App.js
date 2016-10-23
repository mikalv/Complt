import React, { Component } from 'react';
import AddItem from './components/AddItem';
import Item from './components/Item';
import Icon from './ui/Icon';

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
        {this.state.items.map((item, i) => <Item key={i} name={item.name} type={item.type} />)}
        <Icon icon="face" />
      </div>
    );
  }
}

export default App;
