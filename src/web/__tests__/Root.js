import { shallow } from 'enzyme';
import Root from '../Root';

describe('Root', () => {
  it('renders without crashing', () => {
    shallow(Root);
  });
});
