import React from 'react';
import Divider from 'react-md/lib/Dividers/Divider';
import Item from './Item';
import PropTypes from '../../common/PropTypes';

const ItemList = ({
    items = [],
    onLeftButtonClick,
    style,
    onDelete,
    canDeleteTask,
    canDeleteProject,
    canMove,
    onItemTap,
    onItemUpdate,
    onItemMove,
    className,
    ItemComponent = Item,
}) => (
  <div style={style} className={className}>
    {items.map((item, i) => {
      if (!item) return null;
      return ([<ItemComponent
        key={item._id}
        index={i}
        item={item}
        canDelete={
          (canDeleteTask && item.isProject === false) ||
          (canDeleteProject && item.isProject === true)}
        canMove={canMove}
        onLeftButtonClick={onLeftButtonClick !== undefined ? () => onLeftButtonClick(i) : undefined}
        onItemTap={onItemTap !== undefined ? () => onItemTap(i) : undefined}
        onItemUpdate={onItemUpdate !== undefined ? () => onItemUpdate(i) : undefined}
        onItemMove={onItemMove !== undefined ? () => onItemMove(i) : undefined}
        onDelete={() => onDelete(i)}
      />, <Divider />]);
    })}
  </div>
);

ItemList.propTypes = {
  items: React.PropTypes.arrayOf(PropTypes.item),
  onLeftButtonClick: React.PropTypes.func,
  canDeleteProject: React.PropTypes.bool,
  canDeleteTask: React.PropTypes.bool,
  canMove: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
  onItemUpdate: React.PropTypes.func,
  onItemMove: React.PropTypes.func,
  style: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: React.PropTypes.string,
  ItemComponent: React.PropTypes.func,
};

export default ItemList;
