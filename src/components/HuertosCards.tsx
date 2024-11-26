import { StyleSheet, Text, View, Image, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import COLORS from "../../App/Constants/Color";
import { getForecast, getWeather } from "../servises/OpenWeather/weather.servises";
import { CurrentWeather, Forecast } from "../servises/OpenWeather/models/weather.models";
import { predecirAlertas } from "../servises/predicciones/predicciones.service";
import { Huertos } from "../servises/huertos/models/huerto.models";

type Props = {
  huerto: Huertos;
  imageTemp: any;
  imageHmdd: any;
};

type CardState = {
  temp: number;
  hmdd: number;
  loading: boolean;
  alertasPronosticadas: number;
  forecast?: Forecast;
}

class HuertosCards extends Component<Props, CardState> {
  constructor(props) {
    super(props);
    this.state = { temp: 0, hmdd: 0, loading: true, alertasPronosticadas: 0 };
  }

  componentDidMount(): void {
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
          height: 140,
          marginBottom: 10,
          marginHorizontal: 5,
          //borderWidth: 0.4,
          borderColor: COLORS.gray,
          backgroundColor: "#F8F8F8",
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
        <View style={{ flex: 1, justifyContent: "center" }}>

          <Text style={{ textAlign: "left", marginStart: 12, fontFamily: "Poppins_700Bold", fontSize: 16, color: COLORS.dark2 }}>
            {this.props.huerto.Nombre}
          </Text>

          <Text style={{ textAlign: "left", marginStart: 12, fontFamily: "Poppins_500Medium", fontSize: 12, color: COLORS.green, marginBottom: -5 }}>
            {this.props.huerto.Nombre}
          </Text>

          <Text style={{ textAlign: "left", marginStart: 12, fontFamily: "Poppins_500Medium", fontSize: 12, color: COLORS.green, marginBottom: -5 }}>
            Alertas Actuales: {0}
          </Text>

          <Text style={{ textAlign: "left", marginStart: 12, fontFamily: "Poppins_500Medium", fontSize: 12, color: COLORS.green, marginBottom: -5 }}>
            Alertas Pronosticadas: {this.state.alertasPronosticadas}
          </Text>

        </View>

        <View style={{ flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "center" }}>
          {
            this.state.loading ?
              <>
                <ActivityIndicator size={"large"} />
              </>
              :
              <>
                <View>
                  <Image
                    source={this.props.imageTemp}
                    style={{ width: 50, height: 50, resizeMode: "contain" }}
                  />
                  <Text style={{ textAlign: "left", marginStart: 12, fontFamily: "Poppins_500Medium", fontSize: 12, color: COLORS.green, marginBottom: -5 }}>
                    {this.state.hmdd}%
                  </Text>
                </View>

                <View>
                  <Image
                    source={this.props.imageHmdd}
                    style={{ marginStart: 20, width: 50, height: 50, resizeMode: "contain" }}
                  />
                  <Text style={{ marginStart: 20, textAlign: "center", fontFamily: "Poppins_500Medium", fontSize: 12, color: COLORS.green, marginBottom: -5 }}>
                    {this.state.temp}°C
                  </Text>
                </View>
              </>
          }
        </View>
      </View>
    );
  }
};

export default HuertosCards;

const styles = StyleSheet.create({});
