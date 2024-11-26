import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import WelcomeScreen from './App/Screens/LoginScreen/WelcomeScreen.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './App/Navigation.tsx';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function App() {
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
  },
});
