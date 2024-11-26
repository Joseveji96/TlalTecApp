import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useAppContext } from '../../../Contexts/App.context';
import Cards from '../../../../src/components/Cards';
import Cards2 from '../../../../src/components/Cards_2';

export default function AlertasActualesScreen({navigation}) {
    const { huerto } = useAppContext();
    const [alertas, setAlertas] = useState<string[]>([]);

    useEffect(() => {
        setAlertas(['Antracnosis', 'Gusano telarañero o Enrollador de Hoja']);
    }, [])

    return (
        <View style={{backgroundColor: "#F8F8F8"}}>
            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 20, marginVertical: 10, marginLeft: 20 }}>{alertas.length ? 'Su huerto sufre de:' : 'Su huerto está seguro'}</Text>

            <ScrollView scrollEventThrottle={10}>
                <View style={{ marginTop: 8 }}>
                    <ScrollView showsVerticalScrollIndicator={false} >

                        {alertas.length > 0 && alertas.map((alerta, index) => (
                            <View key={index} style={{ marginHorizontal: 20, marginVertical: 10 }}>
                                <TouchableOpacity onPress={() => { navigation.navigate('GravedadScreen', { diagnosis: alerta }) }}>
                                    <Cards2 imageUri={require("../../../../src/assets/images/Q1.png")} name={alerta} lvlRisk='Poco Impacto' hr='Ahora' width={"100%"}/>
                                </TouchableOpacity>
                            </View>
                        ))}

                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}
