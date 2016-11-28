import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import { lightGreenA400 } from 'material-ui/styles/colors';
import OakPropTypes from '../PropTypes';
import './Item.css';

const Item = ({ item, onAvatarTouchTap, id }) => {
  if (!item.isProject) {
    item.isProject = false; // eslint-disable-line no-param-reassign
  }
  return (
    <ListItem
      leftAvatar={<Avatar
        color={item.isCompleted ? lightGreenA400 : undefined}
        onTouchTap={e => onAvatarTouchTap(e, id)}
        icon={item.isProject ? <ActionAssignment /> : <ActionDone />}
      />}
    >
      {item.name}
      {item.isProject ? undefined : <div className="Item-chip-container">
        {item.tags.map(
          (tag, i) => <Chip key={i} style={{ marginRight: 5, marginTop: 3 }}>{tag}</Chip>)}
      </div>}
    </ListItem>
  );
};

Item.propTypes = {
  item: OakPropTypes.item,
  onAvatarTouchTap: React.PropTypes.func,
  id: React.PropTypes.number,
};

export default Item;
