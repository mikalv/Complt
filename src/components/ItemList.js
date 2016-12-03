import React from 'react';
import { List } from 'material-ui/List';
import Item from './Item';
import OakPropTypes from '../PropTypes';

const ItemList = ({ items, onItemAvatarTap, style, onDelete, canDelete }) => (
  <List style={style}>
    {items.map((item, i) =>
      <Item
        id={i}
        key={i}
        item={item}
        canDelete={canDelete}
        onAvatarTouchTap={() => onItemAvatarTap(i)}
        onDelete={() => onDelete(i)}
      />)}
  </List>
);

ItemList.propTypes = {
  items: React.PropTypes.arrayOf(OakPropTypes.item),
  onItemAvatarTap: React.PropTypes.func,
  canDelete: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  /* eslint-disable react/forbid-prop-types */
  style: React.PropTypes.object,
};

export default ItemList;
