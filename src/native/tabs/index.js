import { TabNavigator } from 'react-navigation';
import Inbox from './Inbox';
import Projects from './Projects';

export default TabNavigator({
  Inbox: { screen: Inbox },
  Projects: { screen: Projects },
});
