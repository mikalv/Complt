/* eslint-disable no-param-reassign */
// Adapted from https://gist.github.com/developit/b3231344b6b056374bc630fa58308616
import { Component } from 'preact';
import getDisplayName from './getDisplayName';

export default function noUpdate(target) {
  if (target.prototype && target.prototype.render) {
    target.prototype.shouldComponentUpdate = shouldComponentUpdate;
    return target;
  }
  return target.__scunWrap || (target.__scunWrap = wrap(target));
}

function wrap(fn) {
  return class Wrap extends Wrapper {
    displayName = getDisplayName(fn);
    renderChild = fn;
  };
}

class Wrapper extends Component {
  shouldComponentUpdate = shouldComponentUpdate;
  render(props, state, context) {
    return this.renderChild(props, context);
  }
}

export function shouldComponentUpdate() {
  return false;
}
