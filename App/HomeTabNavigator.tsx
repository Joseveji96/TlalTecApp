import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import AllDiagnostics from './Screens/Diagnostics/AllDiagnostics';
import COLORS from './Constants/Color';
import ToolsScreen from './Screens/HomeScreen/ToolsScreen';

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#045B4F',
        tabBarInactiveTintColor: '#B0B0B0', // Color más suave para inactivo
        tabBarStyle: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
          paddingBottom: 10,
          backgroundColor: '#F8F8F8', // Fondo transparente
          borderRadius: 20,  // Bordes redondeados
          shadowColor: '#000', // Sombra
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // Elevación para Android
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={focused ? require("../src/assets/icons/homeBold.png") : require("../src/assets/icons/home.png")} 
              style={{ width: 24, height: 24 }} 
            />
          ),
            headerShown:false,
        }}
      />
      <Tab.Screen 
        name="Herramientas AI" 
        component={ToolsScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require("../src/assets/icons/IA.png")} 
              style={{ width: 24, height: 24, tintColor: focused ? COLORS.green : COLORS.dark2}} 
            />
          ),
          headerShown:false,
        }}
      />
    </Tab.Navigator>
  );
}
