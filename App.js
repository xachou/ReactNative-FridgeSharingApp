import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { MainScreen } from './Main';
import { EntryDetailScreen } from './EntryDetail';
import { CameraScreen } from './CameraScreen';
import { CommentScreen } from './CommentScreen';
const AppNavigator = createStackNavigator(
  {
    Home: MainScreen,
    Details: EntryDetailScreen,
    Camera: CameraScreen,
    Comment: CommentScreen,
    // LabelDetails: LabelDetailScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
