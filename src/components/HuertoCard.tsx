import { StyleSheet, Text, View, Image, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import COLORS from "../../App/Constants/Color";
import { getForecast, getWeather } from "../servises/OpenWeather/weather.servises";
import { CurrentWeather, Forecast } from "../servises/OpenWeather/models/weather.models";
import { predecirAlertas } from "../servises/predicciones/predicciones.service";
import { Huertos } from "../servises/huertos/models/huerto.models";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";

type Props = {
  huerto: Huertos;
  imageTemp: any;
  imageHmdd: any;
  imageHuerto: any;
};

type CardState = {
  temp: number;
  hmdd: number;
  loading: boolean;
  alertasPronosticadas: number;
  forecast?: Forecast;
}

class HuertoCard extends Component<Props, CardState> {
  constructor(props) {
    super(props);
    this.state = { temp: 0, hmdd: 0, loading: true, alertasPronosticadas: 0 };
  }

  componentDidMount(): void {
    // const datosPruebaClima = {
    //   main: {temp: 20, humidity: 60}
    // };
    // this.setState({
    //   temp: datosPruebaClima.main.temp,
    //   hmdd: datosPruebaClima.main.humidity,
    //   loading: false,
    //   alertasPronosticadas: 2, // Valor ficticio
    // });


    getWeather(this.props.huerto.Latitud, this.props.huerto.Longitud)
      .then((response) => {
        if (response.status != 200) {
          throw new Error('No se encontraron huertos registrados');
        }
        return response.json();
      })
      .then((resposeJson) => {
        const response = resposeJson as CurrentWeather;
        // Handle successful login
        this.setState({ temp: response.main.temp, hmdd: response.main.humidity, loading: false });
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });

    getForecast(this.props.huerto.Latitud, this.props.huerto.Longitud)
      .then(response => {
        if (response.status != 200) {
          throw new Error(`No se pudo completar la petición`)
        }
        return response.json();
      }).then(async (body: Forecast) => {
        const alertas = await predecirAlertas(body);

        this.setState({ alertasPronosticadas: alertas.length });
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  }


  render() {
    return (
      <View
        style={{
          height: 130,
          width: "100%",
          borderColor: "#E8E8E8",
          borderWidth: 1,
          // backgroundColor: "rgba(248,248,248,0.7)", // Fondo claro como en la UI deseada
          backgroundColor: "#FEFEFE", // Fondo claro como en la UI deseada
          borderRadius: 12,
          flexDirection: "row",
          padding: 15, // Espaciado interno mejorado
        }}
      >
        {/* Imagen a la izquierda */}
        <View style={{ justifyContent: "center" }}>
          <Image
            source={this.props.imageHuerto}
            style={{
              width: 90,
              height: 90,
              resizeMode: "cover",
              borderRadius: 12, // Borde redondeado
            }}
          />
        </View>
  
        {/* Contenido a la derecha */}
        <View style={{ flex: 1, justifyContent: "flex-start", paddingLeft: 15 }}>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between",}}>
            {/* Nombre Del Huerto */}
            <Text style={{ fontSize: 18, color: COLORS.dark, fontFamily: "Poppins_700Bold" }}>
              {this.props.huerto.Nombre}
            </Text>
  
            {/* Alerta en la parte superior derecha */}
            <View style={styles.alertContainer}>
              <Image
                source={require("../assets/icons/danger1.png")}
                style={styles.alertIcon}
              />
              <Text style={styles.alertText}>{Math.floor(Math.random() * 5) + 1}</Text>
            </View>
          </View>
  
          {/* Dirección */}
          <Text
            style={{
              fontSize: 12,
              color: COLORS.gray3,
              marginTop: 0,
              fontFamily: "Poppins_500Medium",
            }}
          >
            Wilora NT 0872, Ciudad Guzmán
          </Text>
  
          {/* Contenedor para temperatura y humedad */}
          <View style={{ flexDirection: "row", alignItems: "flex-end", marginTop: 10 }}>
            {/* Temperatura */}
            <Text style={{ fontSize: 30, fontWeight: "600", color: COLORS.dark2 }}>
              {this.state.temp}°C
            </Text>
  
            {/* Separador vertical */}
            <View style={{
                width: 2,
                height: "90%",
                backgroundColor: COLORS.gray2,
                marginHorizontal: 5, 
              }}
            />
  
            {/* Humedad */}
            <View style={{ flexDirection: "row", marginBottom:3}}>
              <Image
                source={require("../assets/icons/drop.png")}
                style={{ width: 15, height: 15, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 13,
                  marginRight: 10,
                  fontWeight: "500",
                  color: COLORS.gray3
                }}
              >
                {this.state.hmdd}%
              </Text>
              
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{fontSize: 12, color: COLORS.gray3, fontFamily: "Poppins_600SemiBold"}}>
                    Detalles
                </Text>
                <Image source={require("../assets/icons/arrow-right.png")} style={{width: 15,height: 15,tintColor: COLORS.gray3}}/>
              </View>
            </View>
            
          </View>
        </View>
      </View>
    );
  }
};

export default HuertoCard;

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(255, 81, 42, 0.19)",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  alertIcon: {
    width: 15,
    height: 15,
  },
  alertText: {
    fontSize: 12,
    marginLeft: 5,
    fontFamily: "Poppins_500Medium",
    lineHeight: undefined,
    paddingVertical:0,
    marginBottom: -2,
  },
});

