import { h } from 'preact';
import List from 'preact-material-components/List/List';
import LinkListItem from './LinkListItem';
import './MoveItemList.scss';

export function renderListItem(item, onChooseItem, itemToMove, key) {
  if (item == null || !item.isProject || item._id === itemToMove) return null;
  return [
    <LinkListItem
      Component={'button'}
      className="mdc-ripple-surface"
      key={key}
      onClick={() => onChooseItem(item._id)}
    >
      {item.name || 'Projects'}
    </LinkListItem>,
    ...item.children.map((itemInMap, i) =>
      renderListItem(itemInMap, onChooseItem, itemToMove, i)
    ),
  ];
}

const MoveItemList = props => (
  <div>
    <List>
      {renderListItem(props.itemTree, props.onChooseItem, props.itemToMove, 1)}
    </List>
  </div>
);

export default MoveItemList;
