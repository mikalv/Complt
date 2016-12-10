import React from 'react';
import { List } from 'material-ui/List';
import Item from './Item';
import OakPropTypes from '../PropTypes';

const ItemList = ({ items, onItemAvatarTap, style, onDelete, canDelete, onItemTap }) => (
  <List style={style}>
    {items.map((item, i) => {
      if (item === null) return null;
      return (<Item
        key={i}
        item={item}
        canDelete={canDelete}
        onAvatarTouchTap={onItemAvatarTap !== undefined ? () => onItemAvatarTap(i) : undefined}
        onItemTap={onItemTap !== undefined ? () => onItemTap(i) : undefined}
        onDelete={() => onDelete(i)}
      />);
    })}
  </List>
);

ItemList.propTypes = {
  items: React.PropTypes.arrayOf(OakPropTypes.item),
  onItemAvatarTap: React.PropTypes.func,
  canDelete: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
  style: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default ItemList;
