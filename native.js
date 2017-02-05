import Exponent from 'exponent';
import React from 'react';
import { Provider } from 'react-redux';
import {
  StatusBar,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import { ThemeProvider } from 'react-native-material-ui';
import RootNavigation from './src/native/RootNavigation';
import store from './src/native/configureStore';
import colors from './src/common/colors';

const uiTheme = {
  palette: {
    primaryColor: colors.primary,
  },
};

const AppContainer = () => (
  <ThemeProvider uiTheme={uiTheme}>
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <RootNavigation />
      </View>
    </Provider>
  </ThemeProvider>
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
