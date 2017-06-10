import { h } from 'preact';
import { connect } from 'preact-redux';
import SortableElement from 'react-sortable-hoc/src/SortableElement';
import SortableContainer from 'react-sortable-hoc/src/SortableContainer';
import pure from '../pure';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import ItemList from './ItemList';
import AddItem from './AddItem';
import Item from './Item';
import getFilteredItems from '../../common/utils/getFilteredItems';

const SortableItem = SortableElement(Item);
const SortableItemList = SortableContainer(ItemList);

export const Projects = props => (
  <div className="flex-child flex-child flex column space-between">
    <div className="scroll">
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
          props.showMoveItemDialog(
            props.projectChildren[i]._id,
            props.projectId
          )}
        onItemUpdate={i =>
          props.showUpdateItemDialog(props.projectChildren[i]._id)}
        onLeftButtonClick={i =>
          props.completeItem(
            props.projectChildren[i]._id,
            !props.projectChildren[i].isCompleted
          )}
        items={props.projectChildren}
      />
    </div>
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
  const project = state.items[ownProps.projectId];
  if (project === undefined) return { projectChildren: [] };
  const projectChildren = project.children.map(id => state.items[id]);
  return {
    projectChildren: getFilteredItems(projectChildren, state.itemsToShow),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(pure(Projects));
