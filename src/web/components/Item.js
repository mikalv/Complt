import React from 'react';
import { Link } from 'preact-router';
import Assignment from 'react-icons/lib/md/assignment';
import Done from 'react-icons/lib/md/done';
import Delete from 'react-icons/lib/md/delete';
import Create from 'react-icons/lib/md/create';
import MoreVert from 'react-icons/lib/md/more-vert';
import DragHandle from 'react-icons/lib/md/drag-handle';
import SortableHandle from 'react-sortable-hoc/src/SortableHandle';
import IconButton from './IconButton';
import Chip from './Chip';
import getNextDueDate from '../../common/utils/getNextDueDate';
import colors from '../../common/colors';
import './Item.css';

const Handle = SortableHandle(() => (
  <IconButton className="IconButton-margin"><DragHandle /></IconButton>
));

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

const Item = (
  {
    item = {},
    onLeftButtonClick,
    onDelete,
    canDelete,
    canMove,
    onItemTap,
    onItemUpdate,
    onItemMove,
    canSort,
  },
) => (
  <li className="flex row Item">
    <div className="Item-left">
      <IconButton className="IconButton-margin" onClick={stopPropagation(onLeftButtonClick)}>
        {item.isProject === true
          ? <Assignment
            color={item.isCompleted ? colors.completedItem : 'rgba(255, 255, 255, 0.7)'}
          />
          : <Done color={item.isCompleted ? colors.completedItem : 'rgba(255, 255, 255, 0.7)'} />}
      </IconButton>
    </div>
    <div className="Item-center">
      <span className="Item-name">{item.name}</span>
      {(item.dates && item.dates.length !== 0) ||
        (item.tags && item.tags.length !== 0) ||
        item.parent ||
        item.children
          ? <div className="Item-chip-container">
            {!item.children
              ? undefined
                : <Chip
                  Component={Link}
                  href={`/project/${item._id}`}
                  onClick={stopPropagation(onItemTap)}
                  action
                  className="Item-chip"
                >
                  {item.children.length === 1 ? '1 Item' : `${item.children.length} Items`}
                </Chip>}
            {!item.parent
              ? undefined
              : <Chip
                Component={Link}
                href={`/project/${item.parent._id}`}
                action
                className="Item-chip"
              >
                {getParentProjectName(item.parent)}
              </Chip>}
            {!item.dates || item.dates.length === 0
              ? undefined
              : <Chip className="Item-chip">
                {`Due ${getFormattedDate(getNextDueDate(item.dates))}`}
              </Chip>}
            {!item.tags
              ? undefined
              : item.tags.map(tag => (
                <Chip Component={Link} action href={`/tag/${tag}`} key={tag} className="Item-chip">
                  {tag}
                </Chip>
                ))}
          </div>
        : undefined}
    </div>
    <div className="Item-right">
      {canSort ? <Handle /> : undefined}
      <IconButton className="IconButton-margin" onClick={stopPropagation(onItemUpdate)}>
        <Create />
      </IconButton>
      {canMove
        ? <IconButton className="IconButton-margin" onClick={stopPropagation(onItemMove)}>
          <MoreVert />
        </IconButton>
        : undefined}
      {canDelete
        ? <IconButton className="IconButton-margin" onClick={stopPropagation(onDelete)}>
          <Delete />
        </IconButton>
        : undefined}
    </div>
  </li>
);

export default Item;
