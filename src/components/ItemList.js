import React, { Component } from 'react';
import update from 'react/lib/update';
import { List } from 'material-ui/List';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Item from './Item';
import OakPropTypes from '../PropTypes';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
    };
    this.moveItem = this.moveItem.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
  }
  moveItem(dragIndex, hoverIndex) {
    const { items } = this.state;
    const dragItem = items[dragIndex];

    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem],
        ],
      },
    }));
  }
  render() {
    const {
      onItemAvatarTap, style, onDelete, canDeleteTask, canDeleteProject, onItemTap,
    } = this.props;
    const { items } = this.state;
    return (
      <List style={style}>
        {items.map((item, i) => {
          if (item === null) return null;
          return (<Item
            key={i}
            item={item}
            moverItem={this.moveItem}
            canDelete={
              (canDeleteTask && item.__typename === 'Task') ||
              (canDeleteProject && item.__typename === 'Project')}
            onAvatarTouchTap={onItemAvatarTap !== undefined ? () => onItemAvatarTap(i) : undefined}
            onItemTap={onItemTap !== undefined ? () => onItemTap(i) : undefined}
            onDelete={() => onDelete(i)}
          />);
        })}
      </List>
    );
  }
}

ItemList.propTypes = {
  items: React.PropTypes.arrayOf(OakPropTypes.item),
  onItemAvatarTap: React.PropTypes.func,
  canDeleteProject: React.PropTypes.bool,
  canDeleteTask: React.PropTypes.bool,
  onDelete: React.PropTypes.func,
  onItemTap: React.PropTypes.func,
  style: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default DragDropContext(HTML5Backend)(ItemList); // eslint-disable-line new-cap
