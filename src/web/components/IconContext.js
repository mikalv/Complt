import React, { Component } from 'react';

class IconContext extends Component {
  getChildContext() { // eslint-disable-line class-methods-use-this
    return {
      reactIconBase: {
        style: { verticalAlign: 'none' },
      },
    };
  }
  render() {
    return this.props.children;
  }
}

IconContext.childContextTypes = {
  reactIconBase: React.PropTypes.object,
};
IconContext.propTypes = {
  children: React.PropTypes.node,
};

export default IconContext;
