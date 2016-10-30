import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import { lightGreenA400 } from 'material-ui/styles/colors';
import OakPropTypes from '../PropTypes';

const Item = ({ item, onAvatarTouchTap, id }) => (
  <ListItem
    primaryText={item.name}
    leftAvatar={<Avatar
      color={item.isCompleted ? lightGreenA400 : undefined}
      onTouchTap={e => onAvatarTouchTap(e, id)}
      icon={item.isProject ? <ActionAssignment /> : <ActionDone />}
    />}

  />
);

Item.propTypes = {
  item: OakPropTypes.item,
  onAvatarTouchTap: React.PropTypes.func,
  id: React.PropTypes.number,
};

export default Item;
