import { connect } from 'preact-redux';
import NonProjectItemList from '../components/NonProjectItemList';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getFilteredItems from '../../common/utils/getFilteredItems';
import { getParents } from '../../common/utils/parents';

export function mapStateToProps(state, ownProps) {
  const itemsWithParents = getParents(
    Object.keys(state.items).map(id => state.items[id])
  );
  const items = getFilteredItems(
    itemsWithParents,
    state.itemsToShow,
    item => Array.isArray(item.tags) && item.tags.indexOf(ownProps.tag) !== -1
  );
  return { items };
}

export default connect(mapStateToProps, mapDispatchToProps)(NonProjectItemList);
