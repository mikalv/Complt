import itemsToTree from '../itemsToTree';

const items = [
  { _id: 'item1', isProject: false, isCompleted: true, tags: [] },
  { _id: 'item2', isProject: false, isCompleted: true, tags: [] },
  { _id: 'item3', isProject: false, isCompleted: false, tags: [] },
  { _id: 'item4', isProject: false, isCompleted: true, tags: [] },
  { _id: 'item5', isProject: false, isCompleted: true, tags: [] },
  { _id: 'item6', isProject: false, isCompleted: false, tags: [] },
  { _id: 'item7', isProject: false, isCompleted: true, tags: [] },
  { _id: 'item8', isProject: false, isCompleted: true, tags: [] },
  { _id: 'item9', isProject: false, isCompleted: false, tags: [] },
  {
    _id: 'item11',
    isProject: true,
    children: ['item4', 'item5', 'item6', 'item8'],
  },
  {
    _id: 'item12',
    isProject: true,
    children: ['item3', 'item11', 'item10', 'item7'],
  },
  {
    _id: 'root',
    isProject: true,
    children: ['item1', 'item2', 'item12', 'item9'],
  },
];

describe('itemsToTree', () => {
  it('returns an object with all the children properties being the actual children instead of their ids', () => {
    expect(itemsToTree(items, 'root')).toMatchSnapshot();
  });
});
