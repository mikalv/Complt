import { connect } from 'preact-redux';
import NonProjectItemList from '../components/NonProjectItemList';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getFilteredItems from '../../common/utils/getFilteredItems';
import { getParents } from '../../common/utils/parents';
import areInitialItemsLoaded from '../../common/utils/areInitialItemsLoaded';
import Loading from '../components/Loading';

export function mapStateToProps(state, ownProps) {
  const itemsWithParents = getParents(state.items);
  const items = getFilteredItems(
    itemsWithParents,
    state.itemsToShow,
    item => Array.isArray(item.tags) && item.tags.indexOf(ownProps.tag) !== -1
  );
  return { items };
}

export default areInitialItemsLoaded(
  connect(mapStateToProps, mapDispatchToProps)(NonProjectItemList),
  Loading
);
