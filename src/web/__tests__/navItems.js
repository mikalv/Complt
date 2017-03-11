import { navItemsWithActive } from '../navItems';

describe('navItemsWithActive()', () => {
  it('returns the same array if none of the to properties = the route', () => {
    const items = [{ to: '/inbox' }, { to: '/projects' }, { to: '/account' }];
    expect(navItemsWithActive(items, '/some/path/that/does/not/exist')).toEqual(items);
  });
  it('returns an array with the active property on the objects that have the same path as the current path', () => {
    const items = [{ to: '/inbox' }, { to: '/projects' }, { to: '/account' }];
    const expectedItems = [{ to: '/inbox', active: true }, { to: '/projects' }, { to: '/account' }];
    expect(navItemsWithActive(items, '/inbox')).toEqual(expectedItems);
  });
});
