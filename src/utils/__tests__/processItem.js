import processItem from '../processItem';

describe('processItem(value, type)', () => {
  it('returns null if the value is empty', () => {
    expect(processItem('', 'Task')).toEqual(null);
  });
  it('returns null if the value only contains spaces', () => {
    expect(processItem('      ', 'Task')).toEqual(null);
  });
  it('returns null if the value only contains tags', () => {
    expect(processItem('@tag @tag2', 'Task')).toEqual(null);
  });
  it('does not parse @ followed a word as a tag is the type is Project', () => {
    expect(processItem('@tag @tag2', 'Project').name).toEqual('@tag @tag2');
  });
  it('returns a object with __typename = Task if the type passed is Task', () => {
    expect(processItem('Some Task', 'Task').__typename).toEqual('Task');
  });
  it('returns a object with __typename = Project if the type passed is Project', () => {
    expect(processItem('Some Project', 'Project').__typename).toEqual('Project');
  });
  it('returns an object with a name and tags if it is passed the type Task with a value containing a name and tags', () => {
    expect(processItem('Some Task @tag', 'Task')).toEqual({ __typename: 'Task', name: 'Some Task', tags: ['@tag'] });
  });
  it('returns an object with a name and an empty array for tags if it is passed the type Task with a value containing a name without tags', () => {
    expect(processItem('Some Task', 'Task')).toEqual({ __typename: 'Task', name: 'Some Task', tags: [] });
  });
  it('trims off white space', () => {
    expect(processItem(' Some Task @tag ')).toEqual({ __typename: 'Task', name: 'Some Task', tags: ['@tag'] });
  });
});
