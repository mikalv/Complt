import { connect } from 'preact-redux';
import NonProjectItemList from '../components/NonProjectItemList';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getFilteredItems from '../../common/utils/getFilteredItems';
import { getParents } from '../../common/utils/parents';
import areInitialItemsLoaded from '../../common/utils/areInitialItemsLoaded';
import Loading from '../components/Loading';

export function mapStateToProps(state) {
  const items = getParents(state.items);
  const filteredItems = getFilteredItems(
    items,
    state.itemsToShow,
    ({ _id }) => _id !== 'inbox' && _id !== 'root'
  );
  return { items: filteredItems };
}

export default areInitialItemsLoaded(
  connect(mapStateToProps, mapDispatchToProps)(NonProjectItemList),
  Loading
);
