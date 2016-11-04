import { mount } from 'enzyme';
import Root from '../Root';

describe('Root', () => {
  it('renders without crashing', () => {
    mount(Root);
  });
});
