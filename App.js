import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { MainScreen } from './Main';
import { EntryDetailScreen } from './EntryDetail';
import { CameraScreen } from './CameraScreen';

const AppNavigator = createStackNavigator(
  {
    Home: MainScreen,
    Details: EntryDetailScreen,
    Camera: CameraScreen,
    // LabelList: LabelListScreen,
    // LabelDetails: LabelDetailScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
