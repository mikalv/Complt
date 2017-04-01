import React, { Component } from 'react';
import List from 'react-virtualized/dist/es/List/List';
import CellMeasurer from 'react-virtualized/dist/es/CellMeasurer/CellMeasurer';
import CellMeasurerCache from 'react-virtualized/dist/es/CellMeasurer/CellMeasurerCache';
import Divider from 'react-md/lib/Dividers/Divider';
import Item from './Item';
import PropTypes from '../../common/PropTypes';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this._cache = new CellMeasurerCache({ fixedWidth: true });
    this._rowRenderer = this._rowRenderer.bind(this);
  }
  _rowRenderer({ index, key, parent, style }) {
    const {
        items = [],
        onLeftButtonClick,
        onDelete,
        canDeleteTask,
        canDeleteProject,
        canMove,
        onItemTap,
        onItemUpdate,
        onItemMove,
    } = this.props;
    const item = items[index];
    return (<CellMeasurer
      cache={this._cache}
      columnIndex={0}
      key={key}
      parent={parent}
      rowIndex={index}
    >
      <div style={style}>
        <Item
          key={item._id}
          item={item}
          canDelete={
                (canDeleteTask && item.isProject === false) ||
                (canDeleteProject && item.isProject === true)}
          canMove={canMove}
          onLeftButtonClick={onLeftButtonClick !== undefined ?
            () => onLeftButtonClick(index) : undefined}
          onItemTap={onItemTap !== undefined ? () => onItemTap(index) : undefined}
          onItemUpdate={onItemUpdate !== undefined ? () => onItemUpdate(index) : undefined}
          onItemMove={onItemMove !== undefined ? () => onItemMove(index) : undefined}
          onDelete={() => onDelete(index)}
        />
        <Divider />
      </div>
    </CellMeasurer>);
  }
  render() {
    return (<div style={this.props.style} className={this.props.className}>
      <List
        rowHeight={this._cache.rowHeight}
        rowRenderer={this._rowRenderer}
        rowCount={this.props.items.length}
        height={500}
        width={500}
      />
    </div>);
  }
}

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
};

export default ItemList;
