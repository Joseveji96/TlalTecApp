import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView, Alert} from 'react-native'
import { useFonts } from "expo-font";
import {Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold} from "@expo-google-fonts/poppins"
import COLORS from '../../Constants/Color';
import BackButton from '../../../src/components/BackButton';
import Botton from '../../../src/components/Botton';
import TextInputTL from '../../../src/components/TextInputTL';
import { createUser } from '../../../src/servises/auth/auth.servises';
import { CreateUserRecuest } from '../../../src/servises/auth/models/auth.models';

const SignIn = ({navigation}) => {
  const [fontsLoaded] = useFonts({
		Poppins_500Medium,
		Poppins_600SemiBold,
		Poppins_700Bold,
  })

  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password2, setPassword2] = useState('');

//   Para saber si las fuentes ya estan cargadas
	if (!fontsLoaded) {
			return <View><Text>Loading...</Text></View>;
	}

	function valuate(nombre, email, password, password2) {
		if (nombre.length < 3) {
			Alert.alert('Aviso', 'Introducir un nombre de usuario valido');
	 	}else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i.test(email)) {
	    	Alert.alert('Aviso', 'Introducir un correo electronico valido');
	  	} else if (password.length < 8) {
			Alert.alert('Aviso', 'Introducir una contraseña valida');
	 	} else if (password != password2) {
		 	Alert.alert('Aviso', 'Las contraseñas deben coincidir');
	 	} else {
			console.log(email, password, nombre)
	    	createUser({ Correo: email, Contra: password, Nombre: nombre })
	      		.then((response) => {
					console.log(response.status)
	        	if (response.status !== 201) {
	          		throw new Error('El email o la contraseña son incorrectos');
	        	}
	        	return response.json();
	      	})
	      	.then((resposeJson) => {
	        	const response = resposeJson as CreateUserRecuest;
	        // Handle successful login
	        	navigation.navigate('LoginScreen');
	      	})
	      	.catch((error) => {
	        	Alert.alert('Error', error.message);
	      	});
	  	}
	}

  	return (
    	<SafeAreaView style={styles.Container}>
			<ScrollView scrollEventThrottle={1}>
      			<View style={{flex: 1, marginHorizontal: 22, justifyContent: "space-between"}}>
				<View>
					<View style={{marginTop: 56, marginBottom: 1}}>

						<BackButton onPress={()=>navigation.navigate("WelcomeScreen")} />

						<Text style={{ fontFamily: "Poppins_700Bold", fontSize:32, color: COLORS.dark, marginLeft: 10}}>
						<Text style={{ fontFamily: "Poppins_700Bold", fontSize:32, color: "#045B4F" }}>
						<Text style={{ fontFamily: "Poppins_700Bold", fontSize:32, color: COLORS.dark, marginLeft: 10}}>
						¡Hola!</Text>
						{" "}Registrate</Text>
						{"\n"}Para Comenzar</Text>
					</View>

          		{/* Label Nombre */}
					<View style={{marginBottom: 10}}>
						<Text style={{fontSize: 14,fontFamily: "Poppins_600SemiBold", marginLeft: 10, marginBottom: 5}}>Nombre</Text>
						<TextInputTL placeholder="Ingrese su nombre" 
						keyboardType="default"
						onChangeText={(nombre) => setNombre(nombre)}/>
					</View>

					{/* Label Correo */}
					<View style={{marginBottom: 10}}>
						<Text style={{fontSize: 14,fontFamily: "Poppins_600SemiBold", marginLeft: 10, marginBottom: 5}}>Correo</Text>
						<TextInputTL placeholder='Ingresa tu Correo Electronico' 
						keyboardType='email-address'
						onChangeText={(email) => setEmail(email)}/>
					</View>

						{/* Label Contraseña */}
					<View style={{marginBottom: 10}}>
						<Text style={{fontSize: 14,fontFamily: "Poppins_600SemiBold", marginLeft: 10, marginBottom: 5}}>Contraseña</Text>
						<TextInputTL placeholder="Ingresa tu Contraseña" 
						secureTextEntry rightIcon={require('../../../src/assets/icons/eye.png')} 
						rightIconOff={require('../../../src/assets/icons/eye-off.png')} 
						onChangeText={(password) => setPassword(password)}/>
					</View>


						{/* Label Contraseña nuevamente */}
					<View style={{marginBottom: 35}}>
						<Text style={{fontSize: 14,fontFamily: "Poppins_600SemiBold", marginLeft: 10, marginBottom: 5}}>Repetir Contraseña</Text>
						<TextInputTL placeholder="Ingresa tu Contraseña nuevamente" 
						secureTextEntry rightIcon={require('../../../src/assets/icons/eye.png')} 
						rightIconOff={require('../../../src/assets/icons/eye-off.png')} 
						onChangeText={(password2) => setPassword2(password2)}/>
					</View>

					<Botton title="Registrarse" filled style={ { backgroundColor: COLORS.dark}} onPress={()=> valuate(nombre,email,password,password2)} />
        		</View>
        

				<View style={{marginBottom: 23}}>
					<View style={{flexDirection: 'row', alignItems:"center", marginVertical: 20}}>
							<View style={{
								flex: 1,
								height: 1,
								backgroundColor: COLORS.dark,
								marginHorizontal: 10
								}}
							/>
							<Text 
								style={{fontSize: 14,
										fontFamily: "Poppins_600SemiBold",
										color: COLORS.gray3}}>
											O Registrate Con
							</Text>


							<View
								style={{
								flex: 1,
								height: 1,
								backgroundColor: COLORS.dark,
								marginHorizontal: 10
								}}
							/>
					</View>
					
						
					<View style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: 10}}>
						<TouchableOpacity style={styles.logIcon} >
						<Image source={require("../../../src/assets/icons/google_ic.png")} style={{height: 24, width: 24}}/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.logIcon}>
						<Image source={require("../../../src/assets/icons/facebook_ic.png")} style={{height: 24, width: 24}}/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.logIcon}>
						<Image source={require("../../../src/assets/icons/cib_apple.png")} style={{height: 24, width: 24}}/>
						</TouchableOpacity>
					</View>

					<View style={{marginTop: 39, alignItems: "center"}}>
						<Text 
							style={{fontSize: 14,
										fontFamily: "Poppins_600SemiBold",
										color: COLORS.dark}}>
										¿Ya tienes una cuenta?
						</Text>
						<Pressable onPress={()=>navigation.navigate("LoginScreen")}>
							<Text style={{color: COLORS.green, fontFamily: "Poppins_500Medium"}}>Iniciar Sesion</Text>
						</Pressable>
					</View>

				</View>
      		</View>
		</ScrollView>
    </SafeAreaView>
  )
}

export default SignIn;


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "white",
  },
  textAlt: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
     marginLeft: 10, 
     marginBottom: 16, 
     marginTop: 24,
     color: COLORS.gray3
  },
  logIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 83,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    
  }

})
