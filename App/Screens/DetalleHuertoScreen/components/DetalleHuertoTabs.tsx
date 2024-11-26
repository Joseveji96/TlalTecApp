
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AlertasActualesScreen from './AlertasActualesScreen';
import { colors, Icon } from 'react-native-elements';
import AlertasPronosticadasScreen from './AlertasPronosticadasScreen';
import ToolsScreen from './ToolsScreen';
import COLORS from '../../../Constants/Color';
import historial from '../../HomeScreen/historial';

const Tab = createBottomTabNavigator();

export default function DetalleHuertoTabs({ route }) {
  const { huerto } = route.params || {}; // Obtener 'huerto' de los parámetros

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#045B4F',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      }}
    >
      <Tab.Screen
        name="Alertas Actuales"
        component={AlertasActualesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={'error-outline'}
              style={{ width: 36, height: 36 }}
              color={focused ? COLORS.green : COLORS.gray}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Alertas Pronosticadas"
        component={AlertasPronosticadasScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={'warning-amber'}
              style={{ width: 36, height: 36 }}
              color={focused ? COLORS.green : COLORS.gray}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Historial"
        component={historial}
        initialParams={{ huerto }} // Pasar 'huerto' como parámetro inicial
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={'error-outline'}
              style={{ width: 36, height: 36 }}
              color={focused ? COLORS.green : COLORS.gray}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}