import { connect } from 'react-redux';
import NonProjectItemList from '../components/NonProjectItemList';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import getFilteredItems from '../../common/utils/getFilteredItems';

export function mapStateToProps(state) {
  return { items: getFilteredItems(state.items.filter(({ _id }) => _id !== 'inbox' && _id !== 'root'), state.itemsToShow) };
}

export default connect(mapStateToProps, mapDispatchToProps)(NonProjectItemList);
