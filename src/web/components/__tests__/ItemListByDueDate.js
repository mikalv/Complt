import { mapStateToProps } from '../ItemListByDueDate';

const item = { isProject: false, isCompleted: false, tags: [], dates: [], _id: '8dcc1935-36f9-436c-9ee1-dd5b09713e5b' };

const dateInBetween = { dateType: 'DUE_DATE', value: 'Mon Mar 20 2017 19:21:50 GMT+1000 (AEST)' };
const dateBefore = { dateType: 'DUE_DATE', value: 'Sun Mar 19 2017 08:00:00 GMT+1000 (AEST)' };

const firstItem = { ...item, dates: [dateInBetween], name: 'thing' };
const secondItem = { ...item, name: 'other thing' };
const thirdItem = { ...item, dates: [dateBefore] };

const items = [firstItem, secondItem, thirdItem];

describe('mapStateToProps', () => {
  it('returns the items that are between the startTime and the endTime', () => {
    expect(mapStateToProps({ startTime: 1489932000000, endTime: 1490018400000 })({ items }))
    .toEqual({ items: [firstItem] });
  });
});
