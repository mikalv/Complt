import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

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
    return <Text>Thing</Text>;
  }
}

export default Inbox;
