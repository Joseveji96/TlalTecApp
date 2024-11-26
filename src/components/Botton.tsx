import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import COLORS from "../../App/Constants/Color";
import { Typography, PoppinsSemiBold} from "../assets/styles/Typography";

const Botton = (props) => {
    const fillColor = props.color || COLORS.green;
    const outlineColor = COLORS.white;
    const bgColor = props.filled ? fillColor : outlineColor;
    const txtColor = props.filled ? COLORS.white : COLORS.dark;



    const [fontsLoaded] = Typography();
  if (!fontsLoaded) {
    return (
     
        <Text>Loading...</Text>
      
    );
  }
    return (
        <TouchableOpacity 
            onPress={props.onPress} 
            style={{...styles.button,
                ...{backgroundColor: bgColor},
                ...props.style,
            }}>
            
            
            <Text style={{fontSize: 15,fontFamily: PoppinsSemiBold, ...{color: txtColor}}}>{props.title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
        //marginBottom: 15, 
    }
})

export default Botton;