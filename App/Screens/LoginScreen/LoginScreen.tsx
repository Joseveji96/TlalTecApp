import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Pressable, Alert, ScrollView } from 'react-native';
import Botton from '../../../src/components/Botton';
import COLORS from '../../Constants/Color';
import BackButton from '../../../src/components/BackButton';
import TextInputTL from '../../../src/components/TextInputTL';
import { login } from '../../../src/servises/auth/auth.servises';
import { UserResponse } from '../../../src/servises/auth/models/auth.models';
import { Typography, PoppinsBold, PoppinsMedium, PoppinsSemiBold } from '../../../src/assets/styles/Typography';
import { useAppContext } from '../../Contexts/App.context';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Extrayendo los valores del contexto de la aplicación (unicamente las funciones de actualización de estado)
  const { setUsuario, setToken } = useAppContext();
  

  function valuate(email, password) {
    if (password.length < 8) {
      Alert.alert('Aviso', 'Introducir una contraseña valida');
    } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i.test(email)) {
      Alert.alert('Aviso', 'Introducir un correo electronico valido');
    } else {
      login({ Correo: email, Contra: password })
        .then((response) => {
          if (response.status !== 201) {
            throw new Error('El email o la contraseña son incorrectos');
          }
          return response.json();
        })
        .then((resposeJson) => {
          const response = resposeJson as UserResponse;
          // Handle successful login
          // Guardando los datos del usuario
          setUsuario(response.user);

          // Guardando el token de la sesión
          setToken(response.token);
          
          navigation.navigate('HomeScreen');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView scrollEventThrottle={1}>
        <View style={{ flex: 1, marginHorizontal: 22, justifyContent: 'space-between' }}>
          <View>
            <View style={{ marginTop: 56, marginBottom: 22 }}>
              <BackButton onPress={() => navigation.navigate('WelcomeScreen')} />
              <Text style={{ fontFamily: PoppinsBold , fontSize: 32, color: COLORS.dark, marginLeft: 10 }}>
                ¡Bienvenido de {'\n'}nuevo!
              </Text>
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 14, fontFamily: PoppinsBold, marginLeft: 10, marginBottom: 5 }}>Correo</Text>
              <TextInputTL
                placeholder='Ingresa tu Correo Electronico'
                keyboardType='email-address'
                onChangeText={(email) => setEmail(email)}
              />
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 14, fontFamily: PoppinsBold, marginLeft: 10, marginBottom: 5 }}>Contraseña</Text>
              <TextInputTL
                placeholder='Ingresa tu Contraseña'
                secureTextEntry 
                rightIcon={require('../../../src/assets/icons/eye.png')}
                rightIconOff={require('../../../src/assets/icons/eye-off.png')}
                onChangeText={(password) => setPassword(password)}
              />
            </View>

            <Text style={styles.textAlt}>¿Olvidaste tu contraseña?</Text>
            <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => 
              valuate(email, password)}>
              <Text style={[{color:"#ffffff"}, styles.buttonText]} >Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 23 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: COLORS.dark, marginHorizontal: 10 }} />
              <Text style={{ fontSize: 14, fontFamily: PoppinsBold, color: COLORS.gray3 }}>
                O Inicia Sesión Con
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: COLORS.dark, marginHorizontal: 10 }} />
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
              <TouchableOpacity style={styles.logIcon}>
                <Image source={require('../../../src/assets/icons/google_ic.png')} style={{ height: 24, width: 24 }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.logIcon}>
                <Image source={require('../../../src/assets/icons/facebook_ic.png')} style={{ height: 24, width: 24 }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.logIcon}>
                <Image source={require('../../../src/assets/icons/cib_apple.png')} style={{ height: 24, width: 24 }} />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 39, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontFamily: PoppinsBold, color: COLORS.dark }}>
                ¿No tienes una cuenta?
              </Text>
              <Pressable onPress={() => navigation.navigate('SignIn')}>
                <Text style={{ color: COLORS.green, fontFamily: PoppinsMedium }}>¡Registrate Ahora!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  textAlt: {
    fontSize: 14,
    fontFamily: PoppinsSemiBold,
    marginLeft: 10,
    marginBottom: 16,
    marginTop: 24,
    color: COLORS.gray3,
  },
  logIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 83,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 10,

  },
  loginButton: {
    backgroundColor: "#1E232C",
  },
  loginAltButton: {
    backgroundColor: "#ffffff",
    borderColor: "#1E232C",
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: PoppinsSemiBold,
    fontSize: 16,
  },
});
