import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const Chip = props => (
  <View><TouchableWithoutFeedback onPress={props.onPress}>
    <View style={styles.innerContainer}><Text style={styles.text}>{props.text}</Text></View>
  </TouchableWithoutFeedback></View>
);

Chip.propTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func,
};

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    paddingTop: 3,
    padding: 5,
    margin: 3,
  },
});

export default Chip;
