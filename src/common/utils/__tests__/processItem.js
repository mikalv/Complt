import processItem from '../processItem';

describe('processItem(value, type)', () => {
  it('returns null if the value is empty', () => {
    expect(processItem('', false)).toEqual(null);
  });
  it('returns null if the value only contains spaces', () => {
    expect(processItem('      ', false)).toEqual(null);
  });
  it('returns null if the value only contains tags', () => {
    expect(processItem('@tag @tag2', false)).toEqual(null);
  });
  it('does not parse @ followed a word as a tag is the type is Project', () => {
    expect(processItem('@tag @tag2', true).name).toEqual('@tag @tag2');
  });
  it('returns a object with isProject === true if the isProject value passed is false', () => {
    expect(processItem('Some Task', false).isProject).toEqual(false);
  });
  it('returns a object with isProject === false if the isProject value passed is false', () => {
    expect(processItem('Some Project', true).isProject).toEqual(true);
  });
  it('returns an object with a name and tags if it is passed the type Task with a value containing a name and tags', () => {
    expect(processItem('Some Task @tag', false)).toEqual({ isProject: false, name: 'Some Task', tags: ['@tag'], isCompleted: false });
  });
  it('returns an object with a name and an empty array for tags if it is passed the type Task with a value containing a name without tags', () => {
    expect(processItem('Some Task', false)).toEqual({ isProject: false, name: 'Some Task', tags: [], isCompleted: false });
  });
  it('trims off white space', () => {
    expect(processItem(' Some Task @tag ', false)).toEqual({ isProject: false, name: 'Some Task', tags: ['@tag'], isCompleted: false });
  });
});
