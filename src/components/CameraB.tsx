import { Image, TouchableOpacity, View ,StyleSheet, Text} from 'react-native'
import React from 'react'
import COLORS from '../../App/Constants/Color'




const CameraBackButton = ({ onPress, icon, color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Image source={require('./../assets/icons/Camera.png')} resizeMode='contain' style={{width: 70, height: 70}}/>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    button:{
        height: 40,
        alignItems: 'center',
        justifyContent: "center",
    },
    
    
})

export default CameraBackButton
