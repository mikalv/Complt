import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import AddItem from '../components/AddItem';

class Inbox extends Component {
  static navigationOptions = {
    title: 'Inbox',
    drawer: () => ({
      label: 'Inbox',
      icon: ({ tintColor }) => (
        <MaterialIcons
          name="inbox"
          size={24}
          style={[{ color: tintColor }]}
        />
      ),
    }),
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.big} />
        <AddItem style={styles.small} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  big: {
    flex: 3,
  },
  small: {
    flex: 1,
  },
});

export default Inbox;
