import { mapStateToProps } from '../All';

const task = { name: 'Task', isProject: false, isCompleted: false, tags: ['@tag'] };
const project = { name: 'Project', isProject: true };

const items = [
  { ...task, _id: 'item1' },
  { ...project, _id: 'item2' },
  { ...task, _id: 'item3' },

];

const itemsWithRootAndInbox = [
  ...items,
  { ...project, _id: 'root' },
  { ...project, _id: 'inbox' },
];

describe('mapStateToProps', () => {
  it('returns an object with a projectChildren property which is an array of items without root or inbox', () => {
    expect(mapStateToProps({ items: itemsWithRootAndInbox })).toEqual({ items });
  });
});
