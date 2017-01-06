import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ExponentConfigView,
} from '@exponent/samples';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'exp.json',
      backgroundColor: colors.navigationBar,
      tintColor: '#fff',
    },
  }
  static propTypes = {
    route: React.PropTypes.object,
  };
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}
      >

        { /* Go ahead and delete ExponentConfigView and replace it with your
           * content, we just wanted to give you a quick view of your config */ }
        <ExponentConfigView />

      </ScrollView>
    );
  }
}
