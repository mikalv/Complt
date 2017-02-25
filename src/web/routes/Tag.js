import { connect } from 'react-redux';
import NonProjectItemList from '../components/NonProjectItemList';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getFilteredItems from '../../common/utils/getFilteredItems';

export function mapStateToProps(state, ownProps) {
  const items = [];
  state.items.forEach((item) => {
    if (item && Array.isArray(item.tags) && item.tags.includes(ownProps.routeParams.tag)) {
      items.push(item);
    }
  });
  return { items: getFilteredItems(items, state.itemsToShow) };
}

export default connect(mapStateToProps, mapDispatchToProps)(NonProjectItemList);
