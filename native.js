import Exponent from 'exponent';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import RootNavigation from './src/native/RootNavigation';

const AppContainer = () => (
  <View style={styles.container}>
    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
    <RootNavigation />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

Exponent.registerRootComponent(AppContainer);
