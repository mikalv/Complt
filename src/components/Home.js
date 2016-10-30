import React, { Component } from 'react';
import { List } from 'material-ui/List';
import AddItem from './AddItem';
import Item from './Item';

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
  handleItemAvatarTap(e, id) {
    const items = this.state.items;
    if (items[id].isProject) {
      return;
    }
    items[id].isCompleted = !items[id].isCompleted;
    this.setState({ items });
  }
  render() {
    return (
      <div>
        <AddItem onAdd={this.addItem} />
        <br />
        <List>
          {this.state.items.map((item, i) =>
            <Item id={i} key={i} item={item} onAvatarTouchTap={this.handleItemAvatarTap} />)}
        </List>
      </div>
    );
  }
}

export default Home;
