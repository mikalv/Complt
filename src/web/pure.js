/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
// Taken from https://gist.github.com/developit/b3231344b6b056374bc630fa58308616
import { Component } from 'preact';
import getDisplayName from './getDisplayName';

export default function pure(target) {
  if (target.prototype && target.prototype.render) {
    target.prototype.shouldComponentUpdate = shouldComponentUpdate;
    return target;
  }
  return target.__scuWrap || (target.__scuWrap = wrap(target)); // eslint-disable-line no-return-assign
}

function wrap(fn) {
  return class Wrap extends Wrapper {
    displayName = getDisplayName(fn);
    renderChild = fn;
  };
}

class Wrapper extends Component {
  shouldComponentUpdate(props) {
    return shallowDiffers(props, this.props);
  }
  render(props, state, context) {
    return this.renderChild(props, context);
  }
}

export function shouldComponentUpdate(props, state) {
  return shallowDiffers(props, this.props) || shallowDiffers(state, this.state);
}

function shallowDiffers(a, b) {
  for (const key in a) if (a[key] !== b[key]) return true;
  for (const key in b) if (!(key in a)) return true;
  return false;
}
