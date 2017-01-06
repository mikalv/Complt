import {
  createRouter,
} from '@exponent/ex-navigation';

import InboxScreen from '../screens/InboxScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  inbox: () => InboxScreen,
  projects: () => ProjectsScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
