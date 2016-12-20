import { taskTagsResolver } from '../resolvers';

describe('TagsTagsResolver()', () => {
  it('returns an empty array if it is passed an object without a tags property', () => {
    expect(taskTagsResolver({})).toEqual([]);
  });
  it('returns the tags property if the object passed has it', () => {
    expect(taskTagsResolver({ tags: ['@tag'] })).toEqual(['@tag']);
  });
});
