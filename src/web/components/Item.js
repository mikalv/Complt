import { h } from 'preact';
import { Link } from 'preact-router';
import Assignment from 'react-icons/md/assignment';
import Done from 'react-icons/md/done';
import Delete from 'react-icons/md/delete';
import Create from 'react-icons/md/create';
import MoreVert from 'react-icons/md/more-vert';
import DragHandle from 'react-icons/md/drag-handle';
import SortableHandle from 'react-sortable-hoc/src/SortableHandle';
import cn from 'classnames';
import tinytime from 'tinytime';
import pure from '../pure';
import IconButton from './IconButton';
import Chip from './Chip';
import getNextDueDate from '../../common/utils/getNextDueDate';
import './Item.scss';

const Handle = SortableHandle(props =>
  <IconButton className="IconButton-margin" {...props}>
    <DragHandle />
  </IconButton>
);

const stopPropagation = callback => {
  if (typeof callback === 'function') {
    return e => {
      e.preventDefault();
      e.stopPropagation();
      callback(e);
    };
  }
  return callback;
};

const getParentProjectName = item => {
  switch (item._id) {
    case 'inbox':
      return 'Inbox';
    case 'root':
      return 'Projects';
    default:
      return item.name;
  }
};

const formatDueDate = tinytime('Due {dddd}, {MMMM} {DD}, {YYYY} {h}:{mm}{a}');
const getFormattedDate = dates => {
  const date = new Date(getNextDueDate(dates));
  return formatDueDate.render(date);
};

const Item = ({
  item = {},
  onLeftButtonClick,
  onDelete,
  canDelete,
  canMove,
  onItemUpdate,
  onItemMove,
  canSort,
}) =>
  <li className="flex row Item">
    <div className="Item-left">
      <IconButton
        className={cn('IconButton-margin', {
          'completed-color': item.isCompleted,
        })}
        title={`${item.isCompleted ? 'Unc' : 'C'}omplete ${item.isProject
          ? 'project'
          : 'task'}`}
        onClick={stopPropagation(onLeftButtonClick)}
      >
        {item.isProject === true ? <Assignment /> : <Done />}
      </IconButton>
    </div>
    <div className="Item-center">
      <span className="Item-name">
        {item.name}
      </span>
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
                  action
                  className="Item-chip"
                >
                  {item.children.length === 1
                    ? '1 Item'
                    : `${item.children.length} Items`}
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
                  {getFormattedDate(item.dates)}
                </Chip>}
            {!item.tags
              ? undefined
              : item.tags.map(tag =>
                  <Chip
                    Component={Link}
                    action
                    href={`/tag/${tag}`}
                    key={tag}
                    className="Item-chip"
                  >
                    {tag}
                  </Chip>
                )}
          </div>
        : undefined}
    </div>
    <div className="Item-right">
      {canSort ? <Handle tabIndex={-1} aria-hidden /> : undefined}
      <IconButton
        className="IconButton-margin"
        title={`Update ${item.isProject ? 'project' : 'task'}`}
        onClick={stopPropagation(onItemUpdate)}
      >
        <Create />
      </IconButton>
      {canMove
        ? <IconButton
            className="IconButton-margin"
            title={`Move ${item.isProject
              ? 'project'
              : 'task'} to another project`}
            onClick={stopPropagation(onItemMove)}
          >
            <MoreVert />
          </IconButton>
        : undefined}
      {canDelete
        ? <IconButton
            title={`Delete ${item.isProject ? 'project' : 'task'}`}
            className="IconButton-margin"
            onClick={stopPropagation(onDelete)}
          >
            <Delete />
          </IconButton>
        : undefined}
    </div>
  </li>;

export default pure(Item);
