import React from 'react';
import Assignment from 'react-icons/lib/md/assignment';
import Done from 'react-icons/lib/md/done';
import Delete from 'react-icons/lib/md/delete';
import Create from 'react-icons/lib/md/create';
import ListItem from 'react-md/lib/Lists/ListItem';
import Avatar from 'react-md/lib/Avatars';
import Chip from 'react-md/lib/Chips';
import Button from 'react-md/lib/Buttons';
import PropTypes from '../PropTypes';
import './Item.css';

const Item = ({ item = {}, onAvatarTouchTap, onDelete, canDelete, onItemTap, onItemUpdate }) => (
  <ListItem
    leftAvatar={<Avatar
      onClick={onAvatarTouchTap}
      icon={item.isProject === true ? <Assignment /> : <Done color={item.isCompleted ? '#00E676' : undefined} />}
    />}
    onClick={onItemTap}
    threeLines
    primaryText={item.name}
    secondaryText={!item.tags || item.tags.length === 0 ? undefined : <div className="Item-chip-container">
      {item.tags.map(
        (tag, i) => <Chip key={i} style={{ marginRight: 5, marginTop: 3 }} label={tag} />)}
    </div>}
  >
    <Button
      icon
      onClick={(e) => {
        e.stopPropagation();
        onItemUpdate(e);
      }}
    ><Create /></Button>
    {canDelete ?
      <Button
        icon
        onClick={(e) => {
          e.stopPropagation();
          onDelete(e);
        }}
      ><Delete /></Button> : undefined}
  </ListItem>);

Item.propTypes = {
  item: PropTypes.item,
  onAvatarTouchTap: React.PropTypes.func,
  canDelete: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
  onItemUpdate: React.PropTypes.func,
};

export default Item;
