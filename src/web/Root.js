import { h } from 'preact';
import { Provider } from 'preact-redux';
import store from './configureStore';
import IconContext from './components/IconContext';
import App from './routes/App';

const Root = (
  <Provider store={store}>
    <IconContext>
      <App />
    </IconContext>
  </Provider>
);

export default Root;
