import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import { IconToggle } from 'react-native-material-ui';
import PropTypes from '../../common/PropTypes';
import colors from '../../common/colors';
import Chip from './Chip';


const Item = props => (
  <TouchableNativeFeedback onPress={props.onItemPress}>
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <IconToggle
          name={props.item.isProject ? 'assignment' : 'done'}
          color={props.item.isCompleted ? colors.completedItem : undefined}
          onPress={props.onAvatarPress}
        />
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.name}>{props.item.name}</Text>
        {props.item.tags ? <View style={styles.tagContainer}>
          {props.item.tags.map((tag, i) => <Chip key={i} text={tag} />)}
        </View> : null}
      </View>
      <View><IconToggle name="delete" onPress={props.onDeletePress} /></View>
    </View>
  </TouchableNativeFeedback>
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
