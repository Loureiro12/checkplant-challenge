import {
  type NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import AddAnnotation from '../screens/AddAnnotation';
import Home from '../screens/Home';

type AppRoutesProps = {
  Home: undefined;
  AddAnnotation: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesProps>;

const {Navigator, Screen} = createNativeStackNavigator<AppRoutesProps>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
      <Screen name="Home" component={Home} />

      <Screen name="AddAnnotation" component={AddAnnotation} />
    </Navigator>
  );
}
