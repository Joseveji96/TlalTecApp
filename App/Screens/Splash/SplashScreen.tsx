import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Splash = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: "center"}}>
        <View style={{ flex: 1 }}>
           <LottieView
                source={require('./../../../src/assets/animations/Home.json')}
                style={{ flex: 1, width: windowWidth, height: windowHeight }}
                autoPlay
                loop={false}
                onAnimationFinish={()=>navigation.replace("WelcomeScreen")}

          />
        </View>
    </SafeAreaView>
  )
}

export default Splash



