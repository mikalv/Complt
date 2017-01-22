import React from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import PropTypes from '../PropTypes';

export function renderListItem(item, onChooseItem, itemToMove, key) {
  if (item === null || !item.isProject || item._id === itemToMove) return null;
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
  <div style={{ overflow: 'scroll', width: '500px' }}>
    <List style={{ overflow: 'scroll', width: '500px' }}>
      {renderListItem(props.itemTree, props.onChooseItem, props.itemToMove, 1)}
    </List>
  </div>

);

MoveItemList.propTypes = {
  itemTree: React.PropTypes.arrayOf(PropTypes.item),
  itemToMove: React.PropTypes.string,
  onChooseItem: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

export default MoveItemList;
