// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskApp from './TaskApp';
import GravedadScreen from './GravedadScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskApp">
        <Stack.Screen name="TaskApp" component={TaskApp} />
        <Stack.Screen name="GravedadScreen" component={GravedadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
