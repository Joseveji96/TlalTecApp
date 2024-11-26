import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import COLORS from "../../App/Constants/Color";

type Props = {
  name: string;
  lvlRisk: string;
  imageUri: any;
  hr: string;
  width?: number | any; 
};

class Cards2 extends Component<Props> {
  // Función para determinar el color de fondo basado en el nivel de riesgo
  getBackgroundColor() {
    const { lvlRisk } = this.props;

    switch (lvlRisk.toLowerCase()) {
      case 'alto impacto':
        return "rgba(255, 81, 42, 0.19)"; // Color para nivel alto
      case 'poco impacto':
        return "rgba(255, 200, 0, 0.19)"; // Color para nivel medio
      case 'bajo impacto':
        return "rgba(60, 179, 113, 0.19)"; // Color para nivel bajo
      default:
        return "#F8F8F8"; // Color por defecto
    }
  }

  render() {
    const { width = 230 } = this.props;
    return (
      <View
        style={{
          height: 130,
          width: width,
          marginEnd: 20,
          borderColor: COLORS.gray,
          backgroundColor: "#F8F8F8", // Cambia el color de fondo dinámicamente
          borderRadius: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          shadowColor: COLORS.gray,
          shadowOpacity: 0.8,
          shadowRadius: 5,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          elevation: 5, // Elevación para que la sombra se vea en Android
        }}
      >
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Text
            style={{
              textAlign: "left",
              marginStart: 12,
              fontFamily: "Poppins_700Bold",
              fontSize: 18,
              color: COLORS.dark2,
              marginBottom: 0,
              marginTop: 20,
            }}
            adjustsFontSizeToFit={true} // Ajusta automáticamente el tamaño de la letra
            numberOfLines={2}
          >
            {this.props.name}
          </Text>

          <View
            style={{
              marginStart: 12,
              backgroundColor: this.getBackgroundColor(), // Usa el mismo color para el badge
              width: 90,
              height: 22,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 12,
                color: "#F14336",
                marginBottom: -5,
              }}
            >
              {this.props.lvlRisk}
            </Text>
          </View>
          <Text
            style={{
              textAlign: "left",
              marginStart: 12,
              fontFamily: "Poppins_500Medium",
              fontSize: 12,
              color: COLORS.gray3,
              marginBottom: -5,
              marginTop: this.props.name.length > 20 ? 10 : 20,
            }}
          >
            {this.props.hr}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Image
            source={this.props.imageUri}
            style={{ width: 90, height: 90, resizeMode: "contain", borderRadius: 14 }}
          />
        </View>
      </View>
    );
  }
}

export default Cards2;

const styles = StyleSheet.create({});
