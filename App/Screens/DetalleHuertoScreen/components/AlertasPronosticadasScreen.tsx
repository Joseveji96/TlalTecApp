import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useAppContext } from '../../../Contexts/App.context'
import { getForecast } from '../../../../src/servises/OpenWeather/weather.servises';
import { Forecast } from '../../../../src/servises/OpenWeather/models/weather.models';
import { predecirAlertas } from '../../../../src/servises/predicciones/predicciones.service';
import Cards from '../../../../src/components/Cards';


export default function AlertasPronosticadasScreen({navigation}) {
    const { huerto } = useAppContext();
    const [alertas, setAlertas] = useState<string[]>([]);

    useEffect(() => {
        getForecast(huerto.Latitud, huerto.Longitud)
            .then(response => {
                if (response.status != 200) {
                    throw new Error(`No se pudo completar la petición`)
                }
                return response.json();
            }).then(async (body: Forecast) => {
                const alertasPronosticadas = await predecirAlertas(body);

                setAlertas(alertasPronosticadas.length? alertas : ['Cáncer o cancro', 'Viroide']);
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    }, [])

    return (
        <View>
            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 20, marginBottom: 10 }}>{ alertas.length? 'Su huerto podría desarrollar:': 'Su huerto está seguro'}</Text>

            <ScrollView scrollEventThrottle={10}>
                <View style={{ marginTop: 8 }}>
                    <ScrollView showsVerticalScrollIndicator={false} >

                        {alertas.length > 0 && alertas.map((alerta, index) => (
                            <View key={index} style={{ marginHorizontal: 20 }}>
                                <TouchableOpacity onPress={() => {navigation.navigate('GravedadScreen', { diagnosis: alerta })}}>
                                    <Cards
                                        imageUri={require("../../../../src/assets/images/LogoTlaltec2.png")} 
                                        name={alerta} 
                                        lvlRisk='Poco Impacto'
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}

                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}
