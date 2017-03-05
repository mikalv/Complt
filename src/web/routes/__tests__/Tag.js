import { mapStateToProps } from '../Tag';
import items from '../../exampleItems';

describe('mapStateToProps', () => {
  it('returns an array of items that contain the tag from ownProps.routeParams.tag', () => {
    expect(mapStateToProps({ items }, { match: { params: { tag: '@tag3' } } })).toEqual({ items: [{
      isProject: false,
      name: 'task',
      isCompleted: false,
      tags: [
        '@tag3',
      ],
      _id: '6c4c2b5f-71cd-4194-994f-da42a9d275c3',
    },
    {
      isProject: true,
      name: 'project',
      children: [],
      isCompleted: false,
      tags: [
        '@tag3',
      ],
      _id: '58aa7f62-d5fa-4c8e-aa3a-87b9e4e82ba3',
    }] });
  });
});
