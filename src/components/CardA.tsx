import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import COLORS from "../../App/Constants/Color";

type Props = {
  name: string;
  stage: string;
  organic: boolean;
  date: string;
  infestationLevel: string;
  onPress: () => void; // Nueva propiedad para manejar el evento de presionar
};

class CardA extends Component<Props> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} // Agregar el evento onPress
        style={{
          height: 124,
          marginBottom: 10,
          marginHorizontal: 5,
          borderColor: COLORS.gray,
          backgroundColor: "#F8F8F8",
          borderRadius: 12,
          flexDirection: "column",
          justifyContent: "space-around",
          padding: 12,
          shadowColor: COLORS.gray,
          shadowOpacity: 0.8,
          shadowRadius: 5,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          elevation: 5,
        }}>
        <Text style={styles.textRisk}>{this.props.stage}</Text>
        <Text style={styles.textName}>{this.props.name}</Text>
        <Text style={styles.textDetail}>
          {this.props.organic ? "Orgánico" : "No Orgánico"}
        </Text>
        <Text style={styles.textDetail}>Fecha: {this.props.date}</Text>
        <Text style={styles.textDetail}>Nivel de Infestación: {this.props.infestationLevel}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textRisk: {
    textAlign: "left",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: COLORS.green,
  },
  textName: {
    textAlign: "left",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: COLORS.dark2,
  },
  textDetail: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: COLORS.gray,
  },
});

export default CardA;