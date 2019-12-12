import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { MainScreen } from './Main';
import { EntryDetailScreen } from './EntryDetail';
import { CameraScreen } from './CameraScreen';
import { CommentScreen } from './CommentScreen';
import { LoginScreen } from './LoginScreen';
const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: MainScreen,
    Details: EntryDetailScreen,
    Camera: CameraScreen,
    Comment: CommentScreen,
    // LabelDetails: LabelDetailScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;


