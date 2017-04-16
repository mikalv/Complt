import React from 'react';
import Link from 'react-router-dom/Link';
import Assignment from 'react-icons/lib/md/assignment';
import Done from 'react-icons/lib/md/done';
import Delete from 'react-icons/lib/md/delete';
import Create from 'react-icons/lib/md/create';
import MoreVert from 'react-icons/lib/md/more-vert';
import Chip from 'react-md/lib/Chips/Chip';
import Button from 'react-md/lib/Buttons/Button';
import AccessibleFakeInkedButton from 'react-md/lib/Helpers/AccessibleFakeInkedButton';
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

const Item = ({
  item = {},
  onLeftButtonClick,
  onDelete,
  canDelete,
  canMove,
  onItemTap,
  onItemUpdate,
  onItemMove,
  connectDragSource,
  connectDropTarget,
}) => {
  const thing = (<AccessibleFakeInkedButton
    draggable
    component={'div'}
    onClick={stopPropagation(onItemTap)}
    to={item.isProject ? `project/${item._id}` : undefined}
    className="flex row Item"
  >
    <div className="Item-left">
      <Button icon onClick={stopPropagation(onLeftButtonClick)}>{item.isProject === true ?
        <Assignment color={item.isCompleted ? colors.completedItem : undefined} /> :
        <Done color={item.isCompleted ? colors.completedItem : undefined} />}</Button>
    </div>
    <div className="Item-center">
      <span className="Item-name">{item.name}</span>
      {(item.dates && item.dates.length !== 0) || (item.tags && item.tags.length !== 0) || item.parent || item.children ? <div className="Item-chip-container">
        {!item.children ? undefined : <Chip className="Item-chip" label={item.children.length === 1 ? '1 Item' : `${item.children.length} Items`} />}
        {!item.parent ? undefined : <Link to={`/project/${item.parent._id}`} className="Item-chip-link"><Chip className="Item-chip" label={getParentProjectName(item.parent)} /></Link>}
        {!item.dates || item.dates.length === 0 ? undefined : <Chip className="Item-chip" label={`Due ${formatDate(dateCreate(getNextDueDate(item.dates)), '%c')}`} />}
        {!item.tags ? undefined :
          item.tags.map(
            tag => <Link to={`/tag/${tag}`} key={tag} className="Item-chip-link" onClick={stopPropagation(() => history.push(`/tag/${tag}`))}><Chip className="Item-chip" label={tag} /></Link>)}
      </div> : undefined}
    </div>
    <div className="Item-right">
      <Button icon onClick={stopPropagation(onItemUpdate)}><Create /></Button>
      {canMove ? <Button icon onClick={stopPropagation(onItemMove)}><MoreVert /></Button>
      : undefined}
      {canDelete ?
        <Button icon onClick={stopPropagation(onDelete)}><Delete /></Button> : undefined}
    </div>

  </AccessibleFakeInkedButton>);
  if (connectDropTarget && connectDragSource) {
    console.log('drag n drop thing');
    return connectDropTarget(connectDragSource(<div>{thing}</div>));
  }
  return thing;
};

Item.propTypes = {
  item: PropTypes.item,
  onLeftButtonClick: React.PropTypes.func,
  canDelete: React.PropTypes.bool,
  canMove: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
  onItemUpdate: React.PropTypes.func,
  onItemMove: React.PropTypes.func,
};

export default Item;
