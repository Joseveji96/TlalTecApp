import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import COLORS from "../../App/Constants/Color";
import { Typography, PoppinsSemiBold } from "../assets/styles/Typography";

const Btn2 = (props) => {
  const fillColor = props.color || COLORS.green;
  const outlineColor = COLORS.white;
  const bgColor = props.filled ? fillColor : outlineColor;
  const txtColor = props.filled ? COLORS.white : COLORS.dark;

  const [fontsLoaded] = Typography();
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor, height: props.height || 50 }, // Altura personalizable
        ...props.style,
      }}
    >
      <View style={styles.content}>
        {/* Si se pasa una imagen (icono), se muestra */}
        {props.icon && (
          <Image
            source={props.icon}
            style={styles.icon} // Estilo del ícono
          />
        )}
        <Text
          style={{
            fontSize: 15,
            fontFamily: PoppinsSemiBold,
            color: txtColor,
            marginLeft: props.icon ? 10 : 0, // Espaciado entre el ícono y el texto
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center", // Para centrar el contenido
  },
  content: {
    flexDirection: "row", // Alineación horizontal (ícono y texto en la misma fila)
    alignItems: "center", // Alinear verticalmente ícono y texto
  },
  icon: {
    width: 20, // Ancho del ícono
    height: 20, // Alto del ícono
    resizeMode: "contain", // Asegura que la imagen no se deforme
  },
});

export default Btn2;
