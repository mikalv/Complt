import React from 'react';
import { connect } from 'preact-redux';
import SortableElement from 'react-sortable-hoc/src/SortableElement';
import SortableContainer from 'react-sortable-hoc/src/SortableContainer';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import ItemList from './ItemList';
import AddItem from './AddItem';
import Item from './Item';
import getFilteredItems from '../../common/utils/getFilteredItems';
import areInitialItemsLoaded from '../../common/utils/areInitialItemsLoaded';
import Loading from './Loading';

const SortableItem = SortableElement(Item);
const SortableItemList = SortableContainer(ItemList);

export const Projects = props => (
  <div className="flex-child flex-child flex column space-between">
    <SortableItemList
      onDelete={i =>
        props.deleteItem(props.projectId, props.projectChildren[i]._id)}
      canDeleteTask
      canDeleteProject
      canMove
      canSort
      useDragHandle
      onSortEnd={({ oldIndex, newIndex }) =>
        props.reorderItem(props.projectId, oldIndex, newIndex)}
      ItemComponent={SortableItem}
      onItemMove={i =>
        props.showMoveItemDialog(props.projectChildren[i]._id, props.projectId)}
      onItemUpdate={i =>
        props.showUpdateItemDialog(props.projectChildren[i]._id)}
      onLeftButtonClick={i =>
        props.completeItem(
          props.projectChildren[i]._id,
          !props.projectChildren[i].isCompleted
        )}
      items={props.projectChildren}
      onItemTap={i => {
        if (props.projectChildren[i].isProject) {
          props.routerPush(`/project/${props.projectChildren[i]._id}`);
        }
      }}
      className="scroll"
    />
    <AddItem
      initialIsProject={props.initialIsProject}
      canChangeType={props.canChangeType}
      onAddItem={item => {
        if (item.isProject) props.createProject(props.projectId, item);
        else props.createTask(props.projectId, item);
      }}
    />
  </div>
);

export function mapStateToProps(state, ownProps) {
  const project = state.items.find(item => item._id === ownProps.projectId);
  if (project === undefined) return { projectChildren: [] };
  const projectChildren = project.children.map(id =>
    state.items.find(item => item._id === id)
  );
  return {
    projectChildren: getFilteredItems(projectChildren, state.itemsToShow),
  };
}

export default areInitialItemsLoaded(
  connect(mapStateToProps, mapDispatchToProps)(Projects),
  Loading
);
