import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@exponent/ex-navigation';
import {
  MaterialIcons,
} from 'react-native-vector-icons';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  header: {
    height: 180,
    width: 300,
    backgroundColor: colors.drawerHeader,
  },
  buttonTitleText: {
    color: '#222',
    marginLeft: 18,
    fontSize: 17,
    marginTop: 2,
    marginBottom: 2,
  },
  icon: {
    color: '#999',
    fontSize: 20,
    marginTop: 2,
    marginBottom: 2,
  },
  selectedText: {
    color: colors.primary,
  },
  selectedItemStyle: {
    backgroundColor: '#E8E8E8',
  },
});

const renderIcon = (icon, isSelected) => (
  <MaterialIcons
    style={[styles.icon, isSelected ? styles.selectedText : null]}
    name={icon}
  />
);

const renderTitle = (title, isSelected) => (
  <Text
    style={[styles.buttonTitleText, isSelected ? styles.selectedText : null]}
  >{title}</Text>
);


const RootNavigation = () => (
  <DrawerNavigation
    initialItem="inbox"
    drawerWidth={300}
    renderHeader={() =>
      <View style={styles.header} />}
  >
    <DrawerNavigationItem
      id="inbox"
      selectedStyle={styles.selectedItemStyle}
      renderIcon={isSelected => renderIcon('inbox', isSelected)}
      renderTitle={isSelected => renderTitle('Inbox', isSelected)}
    >
      <StackNavigation initialRoute="inbox" />
    </DrawerNavigationItem>

    <DrawerNavigationItem
      id="projects"
      selectedStyle={styles.selectedItemStyle}
      renderIcon={isSelected => renderIcon('home', isSelected)}
      renderTitle={isSelected => renderTitle('Projects', isSelected)}
    >
      <StackNavigation initialRoute="projects" />
    </DrawerNavigationItem>

    <DrawerNavigationItem
      id="settings"
      selectedStyle={styles.selectedItemStyle}
      renderIcon={isSelected => renderIcon('settings', isSelected)}
      renderTitle={isSelected => renderTitle('Settings', isSelected)}
    >
      <StackNavigation initialRoute="settings" />
    </DrawerNavigationItem>
  </DrawerNavigation>
);

export default RootNavigation;
