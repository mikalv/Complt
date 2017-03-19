import React from 'react';
import Link from 'react-router-dom/Link';
import Assignment from 'react-icons/lib/md/assignment';
import Done from 'react-icons/lib/md/done';
import Delete from 'react-icons/lib/md/delete';
import Create from 'react-icons/lib/md/create';
import MoreVert from 'react-icons/lib/md/more-vert';
import ListItem from 'react-md/lib/Lists/ListItem';
import Avatar from 'react-md/lib/Avatars/Avatar';
import Chip from 'react-md/lib/Chips/Chip';
import Button from 'react-md/lib/Buttons/Button';
import dateCreate from 'sugar-date/date/create';
import formatDate from 'sugar-date/date/format';
import getNextDueDate from '../../common/utils/getNextDueDate';
import history from '../../web/history';
import PropTypes from '../../common/PropTypes';
import colors from '../../common/colors';
import './Item.css';

const stopPropagation = (callback) => {
  if (typeof callback === 'function') {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      callback(e);
    };
  }
  return callback;
};

const Item = ({
  item = {},
  onAvatarTouchTap,
  onDelete,
  canDelete,
  canMove,
  onItemTap,
  onItemUpdate,
  onItemMove,
}) => (
  <ListItem
    leftAvatar={<Avatar
      onClick={stopPropagation(onAvatarTouchTap)}
      icon={item.isProject === true ?
        <Assignment color={item.isCompleted ? colors.completedItem : undefined} /> :
        <Done color={item.isCompleted ? colors.completedItem : undefined} />
      }
    />}
    onClick={stopPropagation(onItemTap)}
    component={item.isProject ? Link : undefined}
    to={item.isProject ? `project/${item._id}` : undefined}
    threeLines
    primaryText={item.name}
    secondaryText={(item.dates && item.dates.length !== 0) || (item.tags && item.tags.length !== 0) ? <div className="Item-chip-container">
      {!item.dates || item.dates.length === 0 ? undefined : <Chip style={{ marginRight: 5, marginTop: 3 }} label={`Due ${formatDate(dateCreate(getNextDueDate(item.dates)), '%c')}`} />}
      {!item.tags || item.tags.length === 0 ? undefined :
        item.tags.map(
          tag => <Link to={`/tag/${tag}`} key={tag} style={{ textDecoration: 'none' }} onClick={stopPropagation(() => history.push(`/tag/${tag}`))}><Chip style={{ marginRight: 5, marginTop: 3 }} label={tag} /></Link>)}
    </div> : undefined}
  >
    <Button icon onClick={stopPropagation(onItemUpdate)}><Create /></Button>
    {canMove ? <Button icon onClick={stopPropagation(onItemMove)}><MoreVert /></Button> : undefined}
    {canDelete ?
      <Button icon onClick={stopPropagation(onDelete)}><Delete /></Button> : undefined}
  </ListItem>);

Item.propTypes = {
  item: PropTypes.item,
  onAvatarTouchTap: React.PropTypes.func,
  canDelete: React.PropTypes.bool,
  canMove: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
  onItemUpdate: React.PropTypes.func,
  onItemMove: React.PropTypes.func,
};

export default Item;
