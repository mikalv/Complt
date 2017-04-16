import React from 'react';
import { connect as reduxConnect } from 'react-redux';
// import SortableElement from 'react-sortable-hoc/dist/es6/SortableElement';
// import SortableContainer from 'react-sortable-hoc/dist/es6/SortableContainer';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import ItemList from './ItemList';
import AddItem from './AddItem';
import Item from './Item';
import getFilteredItems from '../../common/utils/getFilteredItems';
import PropTypes from '../../common/PropTypes';
import areInitialItemsLoaded from '../../common/utils/areInitialItemsLoaded';
import Loading from './Loading';
import './Projects.css';

const cardSource = {
  beginDrag(props) {
    console.log('drag start');
    console.log(2);
    return {
      id: props.item._id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    console.log(1);
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    console.log(props.ref);
    debugger
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

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
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const SortableItem = DragSource('ITEM', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(DropTarget('ITEM', cardTarget, connect2 => ({
  connectDropTarget: connect2.dropTarget(),
}))(Item));
const SortableItemList = DragDropContext(HTML5Backend)(ItemList);

export const Projects = props => (
  <div className="flex-child">
    <SortableItemList
      onDelete={i => props.deleteItem(props.projectId, props.projectChildren[i]._id)}
      canDeleteTask
      canDeleteProject
      canMove
      pressDelay={300}
      onSortEnd={({ oldIndex, newIndex }) => props.reorderItem(props.projectId, oldIndex, newIndex)}
      ItemComponent={SortableItem}
      onItemMove={i => props.showMoveItemDialog(props.projectChildren[i]._id, props.projectId)}
      onItemUpdate={i => props.showUpdateItemDialog(props.projectChildren[i]._id)}
      onLeftButtonClick={i =>
        props.completeItem(props.projectChildren[i]._id, !props.projectChildren[i].isCompleted)}
      items={props.projectChildren}
      onItemTap={(i) => {
        if (props.projectChildren[i].isProject) {
          props.routerPush(`/project/${props.projectChildren[i]._id}`);
        }
      }}
      className="Projects-item-list"
    />
    <div className="AddItem-fixed">
      <AddItem
        initialIsProject={props.initialIsProject}
        canChangeType={props.canChangeType}
        onAddItem={(item) => {
          if (item.isProject) props.createProject(props.projectId, item);
          else props.createTask(props.projectId, item);
        }}
      />
    </div>
  </div>
);
Projects.propTypes = {
  projectChildren: React.PropTypes.arrayOf(PropTypes.item),
  createProject: React.PropTypes.func,
  createTask: React.PropTypes.func,
  projectId: React.PropTypes.string,
  routerPush: React.PropTypes.func,
  initialIsProject: React.PropTypes.bool,
  canChangeType: React.PropTypes.bool,
  deleteItem: React.PropTypes.func,
  moveItemDialog: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  completeItem: React.PropTypes.func,
  showMoveItemDialog: React.PropTypes.func,
  showUpdateItemDialog: React.PropTypes.func,
  reorderItem: React.PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
  const project = state.items.find(item => item._id === ownProps.projectId);
  if (project === undefined) return { projectChildren: [] };
  const projectChildren = project.children.map(id =>
    state.items.find(item => item._id === id));
  return { projectChildren: getFilteredItems(projectChildren, state.itemsToShow) };
}

export default areInitialItemsLoaded(
  reduxConnect(mapStateToProps, mapDispatchToProps)(Projects),
  Loading);
