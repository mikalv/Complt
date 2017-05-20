import { h, Component } from 'preact';

export default function(load) {
  return class Async extends Component {
    componentWillMount() {
      load().then(child =>
        this.setState({ child: (child && child.default) || child })
      );
    }
    render(props, state) {
      return h(state.child, props);
    }
  };
}
