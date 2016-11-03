import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './Root';
import './index.css';

injectTapEventPlugin();
ReactDOM.render(
  Root,
  document.getElementById('root')
);
