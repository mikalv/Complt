global.setTimeout = global.setTimeout.bind(global);
/* eslint-disable import/first */
import './index.scss';
import ga from './analytics';
import { render } from 'preact'; // eslint-disable-line import/first
import offlinePlugin from 'offline-plugin/runtime'; // eslint-disable-line import/first
import Root from './Root';
import './index.css';
import './components/MoveItemList.scss';

ga.send('pageview');

render(Root, document.getElementById('root'));

offlinePlugin.install();
