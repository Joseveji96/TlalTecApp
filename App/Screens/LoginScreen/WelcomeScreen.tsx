import { View, Text, Dimensions, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack"
import Navigation from '../../Navigation';
import { Typography, PoppinsBold, PoppinsMedium, PoppinsSemiBold } from '../../../src/assets/styles/Typography';


const {height} = Dimensions.get("window");

const {width} = Dimensions.get("window");


//type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen = ({navigation}) => {
  const [fontsLoaded] = Typography();
  if (!fontsLoaded) {
    return (
     
        <Text>Loading...</Text>
      
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Logos TlalTec */}
      <View style={styles.logos}>
        <Image
          style={styles.imageBackground2}
          resizeMode='contain'
          source={require("../../../src/assets/images/LogoTlaltec2.png")}
        />
        <ImageBackground
          style={styles.imageBackground}
          resizeMode='contain'
          source={require("../../../src/assets/images/nameLogo.png")}
        />
      </View>
      
      {/* Slogan TlalTec */}
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            ¡Tecnología hecha{"\n"} Para cuidar su cosecha!
          </Text>
        </View>

        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={()=> navigation.navigate('LoginScreen')}>
        <Text style={[{color:"#ffffff"}, styles.buttonText]} >Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.loginAltButton]} onPress={()=> navigation.navigate('SignIn')}>
        <Text style={[{color:"#1E232C"}, styles.buttonText]}>Registrarse</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logos:{
    height: "55%",
    justifyContent: "flex-end",
    
  },
  imageBackground: {
    //TextLogo
    height: 195,
    
  },
  imageBackground2: {
    //LogoImage
    height: 147,
    marginBottom: 15,
    alignSelf: 'center',
  },
  textContainer: {
    paddingHorizontal: 30,
    paddingTop: 0, // Espaciado superior del contenedor de texto
    paddingBottom: 45, // Espaciado inferior del contenedor de texto
  },
  mainText: {
    fontSize: 20,
    //fontWeight: 'bold',
    textAlign: 'center',
    
    color: "#1E232C",
    fontFamily: PoppinsBold,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 100, // Espaciado inferior del contenedor principal
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
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
    fontSize: 15,
  },
});


export default WelcomeScreen;



// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// <View style={{ flex: 1 }}>
//           <LottieView
//             source={require('./../../../src/assets/animations/Home.json')}
//             style={{ flex: 1, width: windowWidth, height: windowHeight }}
//             autoPlay
//             loop={false}
//           />
//         </View>