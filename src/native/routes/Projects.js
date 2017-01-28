import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

class Projects extends Component {
  static navigationOptions = {
    title: 'Projects',
    drawer: () => ({
      label: 'Projects',
      icon: ({ tintColor }) => (
        <MaterialIcons
          name="assignment"
          size={24}
          style={{ color: tintColor }}
        />
      ),
    }),
  }
  render() {
    return <Text>Other Thing</Text>;
  }
}

export default Projects;
