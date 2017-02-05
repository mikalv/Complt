import { DrawerNavigator } from 'react-navigation';
import Inbox from './routes/Inbox';
import RootProject from './routes/RootProject';

export default DrawerNavigator({
  Inbox: { screen: Inbox },
  RootProject: { screen: RootProject },
});
