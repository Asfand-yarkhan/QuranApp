import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './android/Screens/HomeScreen';
import ReadQuran from './android/Screens/ReadQuranScren';
import Surahs from './android/Screens/Surahs';
import SurahDetail from './android/Screens/SurahDetail';
import Setting from './android/Screens/Setting';
import { FontProvider } from './android/component/FontContext';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
  <FontProvider>
     <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name='ReadQuran' component={ReadQuran}/>
      <Stack.Screen name='Surahs' component={Surahs}/>
      <Stack.Screen name='SurahDetail' component={SurahDetail}/>
      <Stack.Screen name='Setting' component={Setting}/>
    </Stack.Navigator>
   </NavigationContainer>
  </FontProvider>
  );
};

export default App;
