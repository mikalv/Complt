import React, { Component } from 'react';
import './Button.css';
class App extends Component {
  render() {
    return (
      <button className='btn' onClick={this.props.onClick}>{this.props.children}</button>
    );
  }
}

export default App;
