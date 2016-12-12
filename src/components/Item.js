import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDone from 'material-ui/svg-icons/action/done';
import { lightGreenA400 } from 'material-ui/styles/colors';
import OakPropTypes from '../PropTypes';
import './Item.css';

const Item = ({ item = {}, onAvatarTouchTap, onDelete, canDelete, onItemTap }) => (
  <ListItem
    leftAvatar={<Avatar
      color={item.isCompleted ? lightGreenA400 : undefined}
      onTouchTap={onAvatarTouchTap}
      icon={item.__typename === 'Project' ? <ActionAssignment /> : <ActionDone />}
    />}
    onTouchTap={onItemTap}
    rightIconButton={
      canDelete ?
        <IconButton onTouchTap={onDelete}><ActionDelete /></IconButton> : undefined}
  >
    {item.name}
    {!item.tags ? undefined : <div className="Item-chip-container">
      {item.tags.map(
        (tag, i) => <Chip key={i} style={{ marginRight: 5, marginTop: 3 }}>{tag}</Chip>)}
    </div>}
  </ListItem>
);

Item.propTypes = {
  item: OakPropTypes.item,
  onAvatarTouchTap: React.PropTypes.func,
  canDelete: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
};

export default Item;
