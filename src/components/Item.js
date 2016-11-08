import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import { lightGreenA400 } from 'material-ui/styles/colors';
import OakPropTypes from '../PropTypes';

const Item = ({ item, onAvatarTouchTap, id }) => (
  <ListItem
    leftAvatar={<Avatar
      color={item.isCompleted ? lightGreenA400 : undefined}
      onTouchTap={e => onAvatarTouchTap(e, id)}
      icon={item.isProject ? <ActionAssignment /> : <ActionDone />}
    />}
  >
    {item.name}
    {item.isProject ? undefined : <div className="chip-container">
      {item.contexts.map(
        (context, i) => <Chip key={i} style={{ marginRight: 5, marginTop: 3 }}>{context}</Chip>)}
    </div>}
  </ListItem>
);

Item.propTypes = {
  item: OakPropTypes.item,
  onAvatarTouchTap: React.PropTypes.func,
  id: React.PropTypes.number,
};

export default Item;
