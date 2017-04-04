import ReactDOM from 'react-dom';
import Raven from 'raven-js';
import offlinePlugin from 'offline-plugin/runtime';
import Root from './Root';
import './index.css';
import './index.scss';

if (!process.env.REACT_APP_ELECTRON) offlinePlugin.install();

if (!window.location.origin.includes('localhost')) {
  /* eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-96588713-3', 'auto');
  ga('send', 'pageview');
  /* eslint-enable */
} else {
  window.ga = () => {};
}

Raven.config('https://36b5c3acd9014402a6a37623aef60814@sentry.io/118415').install();

ReactDOM.render(
  Root,
  document.getElementById('root'),
);
