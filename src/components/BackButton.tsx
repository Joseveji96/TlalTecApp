//tsrnfs
import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View>
            <Image source={require('./../assets/images/back.png')} resizeMode='contain' style={{width: 41, height: 41}}/>
        </View>
    </TouchableOpacity>
  )
}

export default BackButton

