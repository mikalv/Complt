import ReactDOM from 'react-dom';
import Raven from 'raven-js';
import Root from './Root';
import './index.css';
import './index.scss';

Raven.config('https://36b5c3acd9014402a6a37623aef60814@sentry.io/118415').install();

ReactDOM.render(
  Root,
  document.getElementById('root')
);
