import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class InboxScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Inbox',
      backgroundColor: colors.navigationBar,
      tintColor: '#fff',
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Inbox screen</Text>
      </View>
    );
  }
}
