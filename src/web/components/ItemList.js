import React from 'react';
import Item from './Item';
import PropTypes from '../../common/PropTypes';

const ItemList = ({
    items = [],
    onItemAvatarTap,
    style,
    onDelete,
    canDeleteTask,
    canDeleteProject,
    canMove,
    onItemTap,
    onItemUpdate,
    onItemMove,
    className,
}) => (
  <div style={style} className={className}>
    {items.map((item, i) => {
      if (!item) return null;
      return (<Item
        key={item._id}
        item={item}
        canDelete={
          (canDeleteTask && item.isProject === false) ||
          (canDeleteProject && item.isProject === true)}
        canMove={canMove}
        onAvatarTouchTap={onItemAvatarTap !== undefined ? () => onItemAvatarTap(i) : undefined}
        onItemTap={onItemTap !== undefined ? () => onItemTap(i) : undefined}
        onItemUpdate={onItemUpdate !== undefined ? () => onItemUpdate(i) : undefined}
        onItemMove={onItemMove !== undefined ? () => onItemMove(i) : undefined}
        onDelete={() => onDelete(i)}
      />);
    })}
  </div>
);

ItemList.propTypes = {
  items: React.PropTypes.arrayOf(PropTypes.item),
  onItemAvatarTap: React.PropTypes.func,
  canDeleteProject: React.PropTypes.bool,
  canDeleteTask: React.PropTypes.bool,
  canMove: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
  onItemUpdate: React.PropTypes.func,
  onItemMove: React.PropTypes.func,
  style: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: React.PropTypes.string,
};

export default ItemList;
