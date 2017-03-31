import { connect } from 'react-redux';
import NonProjectItemList from '../components/NonProjectItemList';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getFilteredItems from '../../common/utils/getFilteredItems';
import { getParents } from '../../common/utils/parents';

export function mapStateToProps(state, ownProps) {
  const itemsWithParents = getParents(state.items);
  const items = [];
  itemsWithParents.forEach((item) => {
    if (item && Array.isArray(item.tags) && item.tags.includes(ownProps.match.params.tag)) {
      items.push(item);
    }
  });
  return { items: getFilteredItems(items, state.itemsToShow) };
}

export default connect(mapStateToProps, mapDispatchToProps)(NonProjectItemList);
