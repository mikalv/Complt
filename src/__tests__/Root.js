import { mount } from 'enzyme';
import Root from '../Root';

jest.mock('../db');

describe('Root', () => {
  it('renders without crashing', () => {
    mount(Root);
  });
});
