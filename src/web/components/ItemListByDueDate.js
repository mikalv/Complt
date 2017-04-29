import { connect } from 'preact-redux';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getFilteredItems from '../../common/utils/getFilteredItems';
import getNextDueDate from '../../common/utils/getNextDueDate';
import { getParents } from '../../common/utils/parents';
import NonProjectItemList from './NonProjectItemList';

const sortDates = (a, b) => {
  const aDate = new Date(getNextDueDate(a.dates));
  const bDate = new Date(getNextDueDate(b.dates));
  return aDate < bDate ? -1 : aDate > bDate ? 1 : 0; // eslint-disable-line no-nested-ternary
};

export const mapStateToProps = ({ endTime, startTime }) => state => {
  const items = [];
  const itemsWithParents = getParents(state.items);
  itemsWithParents.forEach(item => {
    if (item && Array.isArray(item.dates)) {
      const nextDueDate = getNextDueDate(item.dates);
      if (!nextDueDate) return;
      if (nextDueDate < endTime && nextDueDate > startTime) {
        items.push(item);
      }
    }
  });
  return { items: getFilteredItems(items, state.itemsToShow).sort(sortDates) };
};

const ItemListByDueDate = _ =>
  connect(mapStateToProps(_), mapDispatchToProps)(NonProjectItemList);

const today = new Date();
today.setHours(0, 0, 0, 0);
const todayTime = today.getTime();

const tomorrow = new Date(todayTime);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowTime = tomorrow.getTime();

const dayAfterTomorrow = new Date(tomorrowTime);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
const dayAfterTomorrowTime = dayAfterTomorrow.getTime();

const week = new Date(todayTime);
week.setDate(today.getDate() + 7);
const weekTime = week.getTime();

export const Today = ItemListByDueDate({
  startTime: todayTime,
  endTime: tomorrowTime,
});
export const Tomorrow = ItemListByDueDate({
  startTime: tomorrowTime,
  endTime: dayAfterTomorrowTime,
});
export const Overdue = ItemListByDueDate({ startTime: 0, endTime: todayTime });
export const Week = ItemListByDueDate({
  startTime: todayTime,
  endTime: weekTime,
});

export default ItemListByDueDate;
