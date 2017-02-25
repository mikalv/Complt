import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import ItemList from '../components/ItemList';
import getFilteredItems from '../../common/utils/getFilteredItems';
import PropTypes from '../../common/PropTypes';

export const Tag = props => (
  <ItemList
    onItemAvatarTap={i =>
        props.completeItem(props.items[i]._id, !props.items[i].isCompleted)}
    onItemUpdate={i => props.showUpdateItemDialog(props.items[i]._id)}
    items={props.items}
    onItemTap={(i) => {
      if (props.items[i].isProject) {
        props.router.push(`/project/${props.items[i]._id}`);
      }
    }}
  />
);

Tag.propTypes = {
  items: React.PropTypes.arrayOf(PropTypes.item),
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

export function mapStateToProps(state, ownProps) {
  const items = [];
  state.items.forEach((item) => {
    if (item && Array.isArray(item.tags) && item.tags.includes(ownProps.routeParams.tag)) {
      items.push(item);
    }
  });
  return { items: getFilteredItems(items, state.itemsToShow) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
