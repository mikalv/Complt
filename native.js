import Exponent from 'exponent';
import React from 'react';
import { Provider } from 'react-redux';
import {
  StatusBar,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import RootNavigation from './src/native/RootNavigation';
import store from './src/native/configureStore';

const AppContainer = () => (
  <Provider store={store}>
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
      <RootNavigation />
    </View>
  </Provider>

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
