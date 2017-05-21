/* eslint-disable global-require */
import './index.scss';
import { render, options, Component } from 'preact'; // eslint-disable-line import/first
import 'preact/devtools'; // eslint-disable-line import/first
import './index.css';
import getDisplayName from './getDisplayName';

const wrapPerf = (WrappedComponent, displayName) =>
  class Perf extends Component {
    displayName = displayName;
    componentWillMount() {
      performance.mark(`${displayName} (willMount)`);
    }
    componentDidMount() {
      performance.mark(`${displayName} (didMount)`);
      performance.measure(
        `${displayName} (mount)`,
        `${displayName} (willMount)`,
        `${displayName} (didMount)`
      );
    }
    componentWillUpdate() {
      performance.mark(`${displayName} (willUpdate)`);
    }
    componentDidUpdate() {
      performance.mark(`${displayName} (didUpdate)`);
      performance.measure(
        `${displayName} (update)`,
        `${displayName} (willUpdate)`,
        `${displayName} (didUpdate)`
      );
    }
    render(props, state, context) {
      return WrappedComponent(props, context);
    }
  };

const getPerfCallbacks = (displayName, oldCallbacks) => ({
  componentWillMount(...args) {
    performance.mark(`${displayName} (willMount)`);
    oldCallbacks.componentWillMount.bind(this)(...args);
  },
  componentDidMount(...args) {
    oldCallbacks.componentDidMount.bind(this)(...args);
    performance.mark(`${displayName} (didMount)`);
    performance.measure(
      `${displayName} (mount)`,
      `${displayName} (willMount)`,
      `${displayName} (didMount)`
    );
  },
  componentWillUpdate(...args) {
    performance.mark(`${displayName} (willUpdate)`);
    oldCallbacks.componentWillUpdate.bind(this)(...args);
  },
  componentDidUpdate(...args) {
    oldCallbacks.componentDidUpdate.bind(this)(...args);
    performance.mark(`${displayName} (didUpdate)`);
    performance.measure(
      `${displayName} (update)`,
      `${displayName} (willUpdate)`,
      `${displayName} (didUpdate)`
    );
  },
});

const noop = () => {};

const getOldCallbacks = component => {
  const oldCallbacks = {};
  callbacks.forEach(callback => {
    oldCallbacks[callback] = component.prototype[callback] || noop;
  });
  return oldCallbacks;
};

const callbacks = [
  'componentWillMount',
  'componentDidMount',
  'componentWillUpdate',
  'componentDidUpdate',
];

options.vnode = component => {
  if (
    component &&
    component.nodeName &&
    typeof component.nodeName === 'function' &&
    window.performance !== undefined
  ) {
    const displayName = getDisplayName(component.nodeName);
    component.nodeName.__perf = true; // eslint-disable-line no-param-reassign
    if (!component.nodeName.prototype) {
      component.nodeName = wrapPerf(component.nodeName, displayName); // eslint-disable-line no-param-reassign
      return;
    }
    const oldCallbacks = getOldCallbacks(component.nodeName);
    const perfCallbacks = getPerfCallbacks(displayName, oldCallbacks);
    callbacks.forEach(callback => {
      component.nodeName.prototype[callback] = perfCallbacks[callback]; // eslint-disable-line no-param-reassign
    });
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
