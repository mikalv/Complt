import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import OakPropTypes from '../PropTypes';

const Item = ({ item }) => (
  <ListItem
    primaryText={item.name}
    leftAvatar={<Avatar icon={item.isProject ? <ActionAssignment /> : <ActionDone />} />}
  />
);

Item.propTypes = {
  item: OakPropTypes.item,
};

export default Item;
