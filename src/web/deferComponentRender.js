// inspired by https://gist.github.com/paularmstrong/cc2ead7e2a0dec37d8b2096fc8d85759
import { h, Component } from 'preact';

export default function deferComponentRender(WrappedComponent) {
  class DeferredRenderWrapper extends Component {
    state = { shouldRender: false };
    componentDidMount() {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() =>
          this.setState({ shouldRender: true })
        );
      });
    }
    render(props, state) {
      return state.shouldRender ? <WrappedComponent {...props} /> : null;
    }
  }
  return DeferredRenderWrapper;
}
