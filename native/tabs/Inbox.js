import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

class Inbox extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Inbox',
      icon: () => <MaterialIcons icon="inbox" />,
    },
  }
  render() {
    return <Text>Thing</Text>;
  }
}

export default Inbox;
