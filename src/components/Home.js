import React, { Component } from 'react';
import AddItem from './AddItem';
import ItemList from './ItemList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.addItem = this.addItem.bind(this);
    this.handleItemAvatarTap = this.handleItemAvatarTap.bind(this);
  }
  addItem(item) {
    const items = this.state.items;
    items.push(item);
    this.setState({ items });
  }
  handleItemAvatarTap(index) {
    const items = this.state.items;
    if (items[index].isProject) {
      return;
    }
    items[index].isCompleted = !items[index].isCompleted;
    this.setState({ items });
  }
  render() {
    return (
      <div className="container">
        <AddItem onAdd={this.addItem} />
        <ItemList items={this.state.items} onItemAvatarTap={this.handleItemAvatarTap} />
      </div>
    );
  }
}

export default Home;
