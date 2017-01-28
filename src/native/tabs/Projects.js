import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

class Projects extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Projects',
      icon: () => <MaterialIcons icon="assignment" />,
    },
  }
  render() {
    return <Text>Other Thing</Text>;
  }
}

export default Projects;
