import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { MainScreen } from './Main';
import { EntryDetailScreen } from './EntryDetail';


const AppNavigator = createStackNavigator(
  {
    Home: MainScreen,
    Details: EntryDetailScreen,
    // LabelList: LabelListScreen,
    // LabelDetails: LabelDetailScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
