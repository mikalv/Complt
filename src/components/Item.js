import React from 'react';
import ListItem from 'react-md/lib/Lists/ListItem';
import Avatar from 'react-md/lib/Avatars';
import Chip from 'react-md/lib/Chips';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import OakPropTypes from '../PropTypes';
import './Item.css';


const Item = ({ item = {}, onAvatarTouchTap, onDelete, canDelete, onItemTap }) => (
  <ListItem
    leftAvatar={<Avatar
      onClick={onAvatarTouchTap}
      icon={<FontIcon style={{ color: item.isCompleted ? '#00E676' : undefined }}>{item.isProject === true ? 'assignment' : 'done'}</FontIcon>}
    />}
    onClick={onItemTap}
    threeLines
    primaryText={item.name}
    secondaryText={!item.tags || item.tags.length === 0 ? undefined : <div className="Item-chip-container">
      {item.tags.map(
        (tag, i) => <Chip key={i} style={{ marginRight: 5, marginTop: 3 }} label={tag} />)}
    </div>}
  >{canDelete ?
    <Button
      icon
      onClick={(e) => {
        e.stopPropagation();
        onDelete(e);
      }}
    >delete</Button> : undefined}</ListItem>
);

Item.propTypes = {
  item: OakPropTypes.item,
  onAvatarTouchTap: React.PropTypes.func,
  canDelete: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
};

export default Item;
