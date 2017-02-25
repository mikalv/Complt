import React from 'react';
import ItemList from './ItemList';
import PropTypes from '../../common/PropTypes';

const NonProjectItemList = props => (<ItemList
  onItemAvatarTap={i =>
      props.completeItem(props.items[i]._id, !props.items[i].isCompleted)}
  onItemUpdate={i => props.showUpdateItemDialog(props.items[i]._id)}
  items={props.items}
  onItemTap={(i) => {
    if (props.items[i].isProject) {
      props.router.push(`/project/${props.items[i]._id}`);
    }
  }}
/>);

NonProjectItemList.propTypes = {
  items: React.PropTypes.arrayOf(PropTypes.item),
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
};

export default NonProjectItemList;
