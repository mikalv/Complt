import { SHOW_COMPLETED, SHOW_NOT_COMPLETED } from '../redux/itemsToShow';

export default function getFilteredItems(
  items,
  itemsToShow,
  otherFilter = () => true
) {
  switch (itemsToShow) {
    case SHOW_COMPLETED:
      return items.filter(
        item => item && item.isCompleted && otherFilter(item)
      );
    case SHOW_NOT_COMPLETED:
      return items.filter(
        item => item && !item.isCompleted && otherFilter(item)
      );
    default:
      return items.filter(item => item && otherFilter(item));
  }
}
