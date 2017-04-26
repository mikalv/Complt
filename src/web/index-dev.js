/* eslint-disable global-require */
import './index.scss';
import { render } from 'preact'; // eslint-disable-line import/first
import 'preact/devtools'; // eslint-disable-line import/first
import './index.css';

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
