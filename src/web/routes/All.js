import { connect } from 'react-redux';
import NonProjectItemList from '../components/NonProjectItemList';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getFilteredItems from '../../common/utils/getFilteredItems';
import { getParents } from '../../common/utils/parents';

export function mapStateToProps(state) {
  const items = getParents(state.items);
  return { items: getFilteredItems(items.filter(({ _id }) => _id !== 'inbox' && _id !== 'root'), state.itemsToShow) };
}

export default connect(mapStateToProps, mapDispatchToProps)(NonProjectItemList);
