import { h } from 'preact';
import pure from '../pure';
import deferComponentRender from '../deferComponentRender';
import ItemList from './ItemList';

const NonProjectItemList = props =>
  <ItemList
    className="flex-child scroll"
    onLeftButtonClick={i =>
      props.completeItem(props.items[i]._id, !props.items[i].isCompleted)}
    onItemUpdate={i => props.showUpdateItemDialog(props.items[i]._id)}
    items={props.items}
    canMove
    canDeleteTask
    canDeleteProject
    onDelete={i => {
      const item = props.items[i];
      if (item.parent && item.parent._id) {
        props.deleteItem(item.parent._id, item._id);
      } else props.deleteItemWithoutParent(item._id);
    }}
    onItemMove={i => {
      const item = props.items[i];
      if (item.parent && item.parent._id) {
        props.showMoveItemDialog(item._id, item.parent._id);
      } else {
        props.showMoveItemDialog(item._id, null);
      }
    }}
  />;

export default deferComponentRender(pure(NonProjectItemList));
