import React from 'react';
import List from 'preact-material-components/List';
import Select from 'preact-material-components/Select';

export function renderListItem(item, onChooseItem, itemToMove, key) {
  if (item == null || !item.isProject || item._id === itemToMove) return null;
  return [
    <Select.Item tabIndex={0} key={key} onClick={() => onChooseItem(item._id)}>
      {item.name || 'Projects'}
    </Select.Item>,
    ...item.children.map((itemInMap, i) => renderListItem(itemInMap, onChooseItem, itemToMove, i)),
  ];
}

const MoveItemList = props => (
  <div>
    <List>
      {renderListItem(props.itemTree, props.onChooseItem, props.itemToMove, 1)}
    </List>
  </div>
);

export default MoveItemList;
