import ReactDOM from 'react-dom';
import Raven from 'raven-js';
import offlinePlugin from 'offline-plugin/runtime';
import Root from './Root';
import './index.css';
import './index.scss';

offlinePlugin.install();

Raven.config('https://36b5c3acd9014402a6a37623aef60814@sentry.io/118415', { release: process.env.REACT_APP_GIT_REF }).install();

ReactDOM.render(
  Root,
  document.getElementById('root')
);
