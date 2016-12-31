/* eslint-disable new-cap  */

import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDone from 'material-ui/svg-icons/action/done';
import { lightGreenA400 } from 'material-ui/styles/colors';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import OakPropTypes from '../PropTypes';
import './Item.css';

const cardSource = {
  beginDrag(props) {
    console.log(thing);
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    console.log('it did a thing');
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect =
    findDOMNode(component).getBoundingClientRect(); // eslint-disable-line react/no-find-dom-node

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex; // eslint-disable-line no-param-reassign
  },
};

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

export default DropTarget('ITEM', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource('ITEM', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Item));
