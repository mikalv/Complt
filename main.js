import Exponent from 'exponent';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import {
  MaterialIcons,
} from '@exponent/vector-icons';
import router from './navigation/router';
import cacheAssetsAsync from './utils/cacheAssetsAsync';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          require('./assets/images/exponent-wordmark.png'),
        ],
        fonts: [
          MaterialIcons
          .font,
          { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        ],
      });
    } catch (e) {
      console.warn( // eslint-disable-line no-console
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.',
      );
      console.log(e.message); // eslint-disable-line no-console
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
          <NavigationProvider router={router}>
            <StackNavigation id="root" initialRoute={router.getRoute('rootNavigation')} />
          </NavigationProvider>
          <StatusBar barStyle="default" />
        </View>
      );
    }
    return (
      <Exponent.Components.AppLoading />
    );
  }
}

Exponent.registerRootComponent(AppContainer);
