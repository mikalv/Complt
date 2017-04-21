import React from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

export function renderListItem(item, onChooseItem, itemToMove, key) {
  if (item == null || !item.isProject || item._id === itemToMove) return null;
  return (
    <ListItem
      isOpen
      key={key}
      expanderIconChildren=""
      primaryText={item.name || 'Projects'}
      onClick={() => onChooseItem(item._id)}
      nestedItems={item.children.map((itemInMap, i) =>
        renderListItem(itemInMap, onChooseItem, itemToMove, i))}
    />
  );
}

const MoveItemList = props => (
  <div>
    <List>
      {renderListItem(props.itemTree, props.onChooseItem, props.itemToMove, 1)}
    </List>
  </div>

);

export default MoveItemList;
