import { DrawerNavigator } from 'react-navigation';
import Inbox from './routes/Inbox';
import Projects from './routes/Projects';

export default DrawerNavigator({
  Inbox: { screen: Inbox },
  Projects: { screen: Projects },
});
