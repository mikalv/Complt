import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from '../../common/PropTypes';
import Item from './Item';


const List = props => (
  <ScrollView>
    {props.items.map((item, i) => {
      if (!item) return null;
      return (<Item
        key={item._id}
        item={item}
        onAvatarPress={props.onAvatarPress !== undefined ? () => props.onAvatarPress(i) : undefined}
        onItemPress={props.onAvatarPress !== undefined ? () => props.onAvatarPress(i) : undefined}
        onDeletePress={props.onDeletePress !== undefined ? () => props.onDeletePress(i) : undefined}
      />);
    })}
  </ScrollView>
);

List.propTypes = {
  items: React.PropTypes.arrayOf(PropTypes.item),
  onAvatarPress: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onItemPress: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onDeletePress: React.PropTypes.func,
};

export default List;
