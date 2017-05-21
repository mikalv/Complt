/* eslint-disable global-require */
import './index.scss';
import { render, options, Component, h } from 'preact'; // eslint-disable-line import/first
import 'preact/devtools'; // eslint-disable-line import/first
import './index.css';

const getDisplayName = component =>
  component.displayName ||
  component.name ||
  (typeof component === 'string' ? component : 'Component');

const wrapPerf = (WrappedComponent, displayName) =>
  class Perf extends Component {
    displayName = displayName;
    componentWillMount() {
      performance.mark(`${this.displayName} (willMount)`);
    }
    componentDidMount() {
      performance.mark(`${this.displayName} (didMount)`);
      performance.measure(
        `${this.displayName} (mount)`,
        `${this.displayName} (willMount)`,
        `${this.displayName} (didMount)`
      );
    }
    componentWillUpdate() {
      performance.mark(`${this.displayName} (willUpdate)`);
    }
    componentDidUpdate() {
      performance.mark(`${this.displayName} (didUpdate)`);
      performance.measure(
        ` ${this.displayName} (update)`,
        `${this.displayName} (willUpdate)`,
        `${this.displayName} (didUpdate)`
      );
    }
    render(props) {
      return h(WrappedComponent, { ...props, __perf: true });
    }
  };

options.vnode = component => {
  if (
    component &&
    component.nodeName &&
    typeof component.nodeName === 'function' &&
    !(component.attributes && component.attributes.__perf === true) &&
    window.performance
  ) {
    const displayName = getDisplayName(component.nodeName);
    component.nodeName = wrapPerf(component.nodeName, displayName); // eslint-disable-line no-param-reassign
  }
};

window.ga = () => {};

let Root;
let elem;

function init() {
  Root = require('./Root').default;
  elem = render(Root, document.getElementById('root'), elem);
}

init();

if (module.hot) {
  module.hot.accept('./Root', init);
}
