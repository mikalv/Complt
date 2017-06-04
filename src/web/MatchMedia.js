import { h, Component } from 'preact';

export default mediaQuery => WrappedComponent =>
  class MatchMedia extends Component {
    state = {
      matches: false,
    };
    componentWillMount() {
      this.mq = window.matchMedia(mediaQuery);
      this.mq.addListener(this.matchChange);
      this.matchChange();
    }
    componentWillUnmount() {
      this.mq.removeListener(this.matchChange);
    }
    matchChange = () => {
      if (this.mq.matches !== this.state.matches) {
        this.setState({ matches: this.mq.matches });
      }
    };
    render(props, state) {
      return <WrappedComponent {...props} matches={state.matches} />;
    }
  };
