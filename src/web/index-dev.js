/* eslint-disable global-require */
import { render } from 'preact';
import 'preact/devtools';
import './index.css';
import './index.scss';

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
