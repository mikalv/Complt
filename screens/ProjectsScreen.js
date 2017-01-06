import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class ProjectsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Projects',
      backgroundColor: colors.navigationBar,
      tintColor: '#fff',
    },
  }
  static propTypes = {
    route: React.PropTypes.object,
  }
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}
      >
        <Text>This is the Projects screen</Text>
      </ScrollView>
    );
  }
}
