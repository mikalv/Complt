import React, { Component } from 'react';
import './Button.css';
class Button extends Component {
  render() {
    return (
      <button className='btn' onClick={this.props.onClick}>{this.props.children}</button>
    );
  }
}

export default Button;
