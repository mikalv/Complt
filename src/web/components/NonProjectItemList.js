import React from 'react';
import ItemList from './ItemList';
import PropTypes from '../../common/PropTypes';

const NonProjectItemList = props => (<ItemList
  onLeftButtonClick={i =>
    props.completeItem(props.items[i]._id, !props.items[i].isCompleted)}
  onItemUpdate={i => props.showUpdateItemDialog(props.items[i]._id)}
  items={props.items}
  onItemTap={(i) => {
    if (props.items[i].isProject) {
      props.history.push(`/project/${props.items[i]._id}`);
    }
  }}
  canMove
  canDeleteTask
  canDeleteProject
  onDelete={(i) => {
    const item = props.items[i];
    if (item.parent && item.parent._id) {
      props.deleteItem(item.parent._id, item._id);
    }
  }}
  onItemMove={(i) => {
    const item = props.items[i];
    if (item.parent && item.parent._id) {
      props.showMoveItemDialog(item._id, item.parent._id);
    }
  }}
/>);

NonProjectItemList.propTypes = {
  items: React.PropTypes.arrayOf(PropTypes.item),
  history: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
  completeItem: React.PropTypes.func,
  showUpdateItemDialog: React.PropTypes.func,
  showMoveItemDialog: React.PropTypes.func,
  deleteItem: React.PropTypes.func,
};

export default NonProjectItemList;
