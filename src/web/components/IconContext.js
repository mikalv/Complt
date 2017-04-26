import { Component } from 'preact';

class IconContext extends Component {
  getChildContext() {
    return {
      reactIconBase: {
        style: { verticalAlign: 'none' },
      },
    };
  }
  render(props) {
    return props.children[0];
  }
}

export default IconContext;
