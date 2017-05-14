import { connect } from 'preact-redux';
import NonProjectItemList from '../components/NonProjectItemList';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getFilteredItems from '../../common/utils/getFilteredItems';
import { getParents } from '../../common/utils/parents';

export function mapStateToProps(state) {
  const items = getParents(Object.keys(state.items).map(id => state.items[id]));
  const filteredItems = getFilteredItems(
    items,
    state.itemsToShow,
    ({ _id }) => _id !== 'inbox' && _id !== 'root'
  );
  return { items: filteredItems };
}

export default connect(mapStateToProps, mapDispatchToProps)(NonProjectItemList);
