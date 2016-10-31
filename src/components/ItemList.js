import React from 'react';
import { List } from 'material-ui/List';
import Item from './Item';
import OakPropTypes from '../PropTypes';

const ItemList = ({ items, onItemAvatarTap }) => (
  <List>
    {items.map((item, i) =>
      <Item id={i} key={i} item={item} onAvatarTouchTap={() => onItemAvatarTap(i)} />)}
  </List>
);

ItemList.propTypes = {
  items: React.PropTypes.arrayOf(OakPropTypes.item),
  onItemAvatarTap: React.PropTypes.func,
};

export default ItemList;
