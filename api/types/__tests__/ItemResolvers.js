import { itemTypeResolver } from '../resolvers';
import Project from '../Project';
import Task from '../Task';

describe('itemTypeResolver()', () => {
  it('returns Task if value.isProject is false', () => {
    expect(itemTypeResolver({ isProject: false })).toBe(Task);
  });
  it('returns Project if value.isProject is true', () => {
    expect(itemTypeResolver({ isProject: true })).toBe(Project);
  });
});
