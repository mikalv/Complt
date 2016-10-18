import React, { Component } from 'react';
import Button from './components/Button';
class App extends Component {
  logClick() {
    console.log(1);
  }
  render() {
    return (
      <div>
        <h1>Oak</h1>
        <Button onClick={this.logClick.bind(this)}>Test Button</Button>
      </div>
    );
  }
}

export default App;
