import React from 'react';
import Link from 'react-router-dom/Link';
import Assignment from 'react-icons/lib/md/assignment';
import Done from 'react-icons/lib/md/done';
import Delete from 'react-icons/lib/md/delete';
import Create from 'react-icons/lib/md/create';
import MoreVert from 'react-icons/lib/md/more-vert';
import DragHandle from 'react-icons/lib/md/drag-handle';
import Chip from 'react-md/lib/Chips/Chip';
import Button from 'react-md/lib/Buttons/Button';
import SortableHandle from 'react-sortable-hoc/src/SortableHandle';
import getNextDueDate from '../../common/utils/getNextDueDate';
import PropTypes from '../../common/PropTypes';
import colors from '../../common/colors';
import './Item.css';

const Handle = SortableHandle(() => <Button icon><DragHandle /></Button>);

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

const getParentProjectName = (item) => {
  switch (item._id) {
    case 'inbox':
      return 'Inbox';
    case 'root':
      return 'Projects';
    default:
      return item.name;
  }
};

const getFormattedDate = (rawDate) => {
  const date = new Date(rawDate);
  return date.toLocaleString();
};

const Item = ({
  item = {},
  onLeftButtonClick,
  onDelete,
  canDelete,
  canMove,
  onItemTap,
  onItemUpdate,
  onItemMove,
  canSort,
}) => (
  <div
    className="flex row Item md-text"
  >
    <div className="Item-left">
      <Button icon onClick={stopPropagation(onLeftButtonClick)}>{item.isProject === true ?
        <Assignment color={item.isCompleted ? colors.completedItem : 'rgba(255, 255, 255, 0.7)'} /> :
        <Done color={item.isCompleted ? colors.completedItem : 'rgba(255, 255, 255, 0.7)'} />}</Button>
    </div>
    <div className="Item-center">
      <span className="Item-name">{item.name}</span>
      {(item.dates && item.dates.length !== 0) || (item.tags && item.tags.length !== 0) || item.parent || item.children ? <div className="Item-chip-container">
        {!item.children ? undefined : <Link to={`/project/${item._id}`} className="Item-chip-link" onClick={stopPropagation(onItemTap)}><Chip className="Item-chip" label={item.children.length === 1 ? '1 Item' : `${item.children.length} Items`} /></Link>}
        {!item.parent ? undefined : <Link to={`/project/${item.parent._id}`} className="Item-chip-link"><Chip className="Item-chip" label={getParentProjectName(item.parent)} /></Link>}
        {!item.dates || item.dates.length === 0 ? undefined : <Chip className="Item-chip" label={`Due ${getFormattedDate(getNextDueDate(item.dates))}`} />}
        {!item.tags ? undefined :
          item.tags.map(
            tag => <Link to={`/tag/${tag}`} key={tag} className="Item-chip-link"><Chip className="Item-chip" label={tag} /></Link>)}
      </div> : undefined}
    </div>
    <div className="Item-right">
      {canSort ? <Handle /> : undefined}
      <Button icon onClick={stopPropagation(onItemUpdate)}><Create /></Button>
      {canMove ? <Button icon onClick={stopPropagation(onItemMove)}><MoreVert /></Button>
      : undefined}
      {canDelete ?
        <Button icon onClick={stopPropagation(onDelete)}><Delete /></Button> : undefined}
    </div>
  </div>
);

Item.propTypes = {
  item: PropTypes.item,
  onLeftButtonClick: React.PropTypes.func,
  canDelete: React.PropTypes.bool,
  canMove: React.PropTypes.bool,
  canSort: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
  onItemUpdate: React.PropTypes.func,
  onItemMove: React.PropTypes.func,
};

export default Item;
