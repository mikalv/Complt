import { h } from 'preact';
import { Provider } from 'preact-redux';
import store from './configureStore';
import App from './routes/App';

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
