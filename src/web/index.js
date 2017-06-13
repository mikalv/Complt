global.setTimeout = global.setTimeout.bind(global);
/* eslint-disable import/first */
import './index.scss';
import { render } from 'preact'; // eslint-disable-line import/first
import offlinePlugin from 'offline-plugin/runtime'; // eslint-disable-line import/first
import Root from './Root';
import './index.css';

if (!window.location.origin.indexOf('localhost') !== -1) {
  /* eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.defer=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-96588713-3', 'auto');
  ga('send', 'pageview');
  /* eslint-enable */
} else {
  window.ga = () => {};
}

render(Root, document.getElementById('root'));

offlinePlugin.install();
