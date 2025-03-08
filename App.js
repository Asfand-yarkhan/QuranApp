import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './android/Screens/HomeScreen';
import ReadQuran from './android/Screens/ReadQuranScren';
import Surahs from './android/Screens/Surahs';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name='ReadQuran' component={ReadQuran}/>
      <Stack.Screen name='Surahs' component={Surahs}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
};

export default App;
