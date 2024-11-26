import React from 'react'
import { Text, TouchableOpacity, View, Image, StyleSheet, Alert, ScrollView } from 'react-native'
import COLORS from '../../Constants/Color'
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import IconButton from '../../../src/components/IcoBottonTL'
import BackButton from '../../../src/components/BackButton'


export default function ToolsScreen({ navigation }) {
    return (
        <View style={{ marginHorizontal: 22 }}>
            <View style={{ marginTop: 46, marginBottom: 30, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {/* <BackButton onPress={() => navigation.navigate('HomeScreen')} /> */}
                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 32, color: COLORS.dark }}>
                    TlalTec IA
                </Text>
                <IconButton onPress={() => console.log("Hola")} iconSource={require("../../../src/assets/icons/setting-2.png")} iconSize={24} />
            </View>

            <View>
                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, color: COLORS.dark }}>
                    ¡Prueba Nuestra Visión Artificial!
                </Text>
                <TouchableOpacity onPress={()=> navigation.navigate("CameraScreen")} style={{paddingBottom: 25}}>
                    <Image source={require("../../../src/assets/images/VA.png")} style={{width: "100%", objectFit: "contain", height:100}}/>
                </TouchableOpacity>
                <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, color: COLORS.dark }}>
                    ¡Prueba nuestro Sistema Experto!
                </Text>
                <TouchableOpacity onPress={()=> navigation.navigate("AllDiagnostics")} >
                    <Image source={require("../../../src/assets/images/SE.png")} style={{width: "100%", objectFit: "contain", height:100}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})
