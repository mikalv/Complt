import React from 'react';
import List from 'react-md/lib/Lists/List';
import Item from './Item';
import PropTypes from '../PropTypes';

const ItemList = (
  { items = [], onItemAvatarTap, style, onDelete, canDeleteTask, canDeleteProject, onItemTap }
) => (
  <List style={style}>
    {items.map((item, i) => {
      if (!item) return null;
      return (<Item
        key={i}
        item={item}
        canDelete={
          (canDeleteTask && item.isProject === false) ||
          (canDeleteProject && item.isProject === true)}
        onAvatarTouchTap={onItemAvatarTap !== undefined ? () => onItemAvatarTap(i) : undefined}
        onItemTap={onItemTap !== undefined ? () => onItemTap(i) : undefined}
        onDelete={() => onDelete(i)}
      />);
    })}
  </List>
);

ItemList.propTypes = {
  items: React.PropTypes.arrayOf(PropTypes.item),
  onItemAvatarTap: React.PropTypes.func,
  canDeleteProject: React.PropTypes.bool,
  canDeleteTask: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
  style: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default ItemList;
