import { SHOW_COMPLETED, SHOW_NOT_COMPLETED } from '../redux/itemsToShow';

export default function getFilteredItems(items, itemsToShow) {
  switch (itemsToShow) {
    case SHOW_COMPLETED:
      return items.filter(item => item && item.isCompleted);
    case SHOW_NOT_COMPLETED:
      return items.filter(item => item && !item.isCompleted);
    default:
      return items;
  }
}
