import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { ListItem, Body, Left, Right } from 'native-base';
import { IconToggle } from 'react-native-material-ui';
import PropTypes from '../../common/PropTypes';
import colors from '../../common/colors';
import Chip from './Chip';


const Item = props => (
  <ListItem thumbnail onPress={props.onItemPress}>
    <Left>
      <IconToggle
        name={props.item.isProject ? 'assignment' : 'done'}
        color={props.item.isCompleted ? colors.completedItem : undefined}
        onPress={props.onAvatarPress}
      />
    </Left>
    <Body>
      <Text style={styles.name}>{props.item.name}</Text>
      {props.item.tags ? <View style={styles.tagContainer}>
        {props.item.tags.map(tag => <Chip key={tag} text={tag} />)}
      </View> : null}
    </Body>
    <Right>
      <IconToggle name="delete" onPress={props.onDeletePress} />
    </Right>
  </ListItem>
);


Item.propTypes = {
  item: PropTypes.item,
  onDeletePress: React.PropTypes.func,
  onAvatarPress: React.PropTypes.func,
  onItemPress: React.PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    maxHeight: 100,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 6,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 20,
  },
});

export default Item;
