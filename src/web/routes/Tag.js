import { connect } from 'react-redux';
import NonProjectItemList from '../components/NonProjectItemList';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getFilteredItems from '../../common/utils/getFilteredItems';
import { getParents } from '../../common/utils/parents';
import areInitialItemsLoaded from '../../common/utils/areInitialItemsLoaded';
import Loading from '../components/Loading';

export function mapStateToProps(state, ownProps) {
  const itemsWithParents = getParents(state.items);
  const items = [];
  itemsWithParents.forEach(item => {
    if (
      item &&
      Array.isArray(item.tags) &&
      item.tags.indexOf(ownProps.tag) !== -1
    ) {
      items.push(item);
    }
  });
  return { items: getFilteredItems(items, state.itemsToShow) };
}

export default areInitialItemsLoaded(
  connect(mapStateToProps, mapDispatchToProps)(NonProjectItemList),
  Loading
);
