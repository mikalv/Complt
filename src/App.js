import React, { Component } from 'react';
import AddItem from './components/AddItem';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logAddItem = this.logAddItem.bind(this);
  }
  logAddItem(e) {
    console.log(e);
  }
  render() {
    return (
      <div>
        <h1>Oak</h1>
        <AddItem onAdd={this.logAddItem}></AddItem>
      </div>
    );
  }
}

export default App;
