import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './Screens/LoginScreen/WelcomeScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import { View, Text } from 'react-native';
import SignIn from './Screens/LoginScreen/SignIn';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import SplashScreen from './Screens/Splash/SplashScreen';
import CameraScreen from './Screens/CameraScreen/CameraScreen';
import AllDiagnostics from './Screens/Diagnostics/AllDiagnostics';
import HomeTabNavigator from './HomeTabNavigator';
import AddHuertos from './Screens/AddHuertos/AddHuertos';
import GravedadScreen from './Screens/Diagnostics/GravedadScreen';
import { appContext } from './Contexts/App.context';
import { User } from '../src/servises/auth/models/auth.models';
import DetectionResults from './Screens/Diagnostics/DetectionResults';
import { Huertos } from '../src/servises/huertos/models/huerto.models';
import DetalleHuertoScreen from './Screens/DetalleHuertoScreen/DetalleHuertoScreen';
import ToolsScreen from './Screens/HomeScreen/ToolsScreen';

const NavStack = createNativeStackNavigator();


export default function Navigation(){

    // Declaración de estado para el almacenamiento de las sesión (datos de usuario y token) //
    // Definición de objeto usuario y su función de actualización de estado
    const [usuario, setUsuario] = React.useState<User>({} as User);
    const [huerto, setHuerto] = React.useState<Huertos>({} as Huertos)

    // Definición de string token y su función de actualización de estado
    const [token, setToken] = React.useState<string>("");

    const [refreshHuerto, setRefreshHuerto] = React.useState<boolean>(false);


    return(
        // Definición del contexto para la aplicación, Todo lo que esté dentro de la declaración appContext.Provider tendrá accesso a sus valores
        <appContext.Provider
            // Los que esté declarado dentro del objeto value serán accesibles (Por eso se agregan aquí los objetos y funciones declaradas arriba)
            value={{
                usuario,
                setUsuario,
                token,
                setToken,
                refreshHuerto,
                setRefreshHuerto,
                huerto,
                setHuerto,
            }}
        >
            <NavigationContainer>
                <NavStack.Navigator>
                    <NavStack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
                    <NavStack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{ headerShown: false }} />
                    <NavStack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
                    <NavStack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
                    <NavStack.Screen name='HomeScreen' component={HomeTabNavigator} options={{ headerShown: false }} />
                    <NavStack.Screen name='AddHuertos' component={AddHuertos} options={{ headerShown: false }} />
                    <NavStack.Screen name='CameraScreen' component={CameraScreen} options={{ headerShown: false }} />
                    <NavStack.Screen name='AllDiagnostics' component={AllDiagnostics} options={{ headerShown: false }} />
                    <NavStack.Screen name='GravedadScreen' component={GravedadScreen} options={{ headerShown: false }} />
                    <NavStack.Screen name='DetectionResults' component={DetectionResults} options={{ headerShown: false }} />
                    <NavStack.Screen name='DetalleHuertoScreen' component={DetalleHuertoScreen} options={{ headerShown: false }} />
                    <NavStack.Screen name='ToolsScreen' component={ToolsScreen} options={{ headerShown: false }} />
                </NavStack.Navigator>
            </NavigationContainer>

        </appContext.Provider>
    )
}