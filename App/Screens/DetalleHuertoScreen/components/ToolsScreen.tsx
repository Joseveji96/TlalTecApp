import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Linking, ScrollView } from 'react-native';
import COLORS from '../../../Constants/Color';
// import COLORS from '../../Constants/Color';
// import { PoppinsSemiBold } from '../../../src/assets/styles/Typography';

export default function ToolsScreen({ navigation }) {
    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Error al abrir el enlace", err));
    };

    return (
        <View style={{marginHorizontal: 22}}>
            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 20, marginBottom: 10 }}>Documentos de restricciones</Text>
            <ScrollView scrollEventThrottle={10}>
                <View style={{ marginTop: 8 }}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <TouchableOpacity
                            style={[styles.button, styles.downloadButton]}
                            onPress={() => openLink("https://drive.google.com/uc?export=download&id=12qIjb5VR8UofWbiHrPZl23uOUUdBWY7T")}
                        >
                            <Text style={[{ color: "#ffffff" }, styles.buttonText]}>Descargar Restricciones Herbicidas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.downloadButton, { marginTop: 15 }]}
                            onPress={() => openLink("https://drive.google.com/uc?export=download&id=1ZJ6HoTLPP0Bpuqu0majQjZptS23I86f-")}
                        >
                            <Text style={[{ color: "#ffffff" }, styles.buttonText]}>Descargar Restricciones Fungicidas</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
        
    );
}

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
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.gray2,
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingTextButton: {
        position: 'absolute',
        bottom: 6,
        right: 10,
        backgroundColor: COLORS.gray2,
        borderRadius: 30,
        width: 120,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonImage: {
        width: 50,
        height: 50,
        margin: 10,
    },
    button: {
        paddingVertical: 20,  
        paddingHorizontal: 20, 
        borderRadius: 10,
    },
    downloadButton: {
        backgroundColor: "#1E232C",
    },
    buttonText: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
    },
});