import React from 'react';
import cn from 'classnames';
import Divider from './Divider';
import Item from './Item';
import './ItemList.scss';

const ItemList = (
  {
    items = [],
    onLeftButtonClick,
    onDelete,
    canDeleteTask,
    canDeleteProject,
    canMove,
    onItemTap,
    onItemUpdate,
    onItemMove,
    className,
    canSort,
    ItemComponent = Item,
  },
) => (
  <ul className={cn(className, 'ItemList')}>
    {items.map((item, i) => {
      if (!item) return null;
      return [
        <ItemComponent
          key={item._id}
          index={i}
          item={item}
          canSort={canSort}
          canDelete={
            (canDeleteTask && item.isProject === false) ||
              (canDeleteProject && item.isProject === true)
          }
          canMove={canMove}
          onLeftButtonClick={
            onLeftButtonClick !== undefined ? () => onLeftButtonClick(i) : undefined
          }
          onItemTap={onItemTap !== undefined ? () => onItemTap(i) : undefined}
          onItemUpdate={onItemUpdate !== undefined ? () => onItemUpdate(i) : undefined}
          onItemMove={onItemMove !== undefined ? () => onItemMove(i) : undefined}
          onDelete={() => onDelete(i)}
        />,
        <Divider />,
      ];
    })}
  </ul>
);

export default ItemList;
