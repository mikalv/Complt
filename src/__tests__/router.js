import { mount } from 'enzyme';
import router from '../router';

it('renders without crashing', () => {
  mount(router);
});
