import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import router from './router';
import './index.css';

injectTapEventPlugin();
ReactDOM.render(
  router,
  document.getElementById('root')
);
