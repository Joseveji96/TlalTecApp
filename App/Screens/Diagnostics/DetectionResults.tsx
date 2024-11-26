import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native'
import React from 'react'
import COLORS from '../../Constants/Color';
import BackButton from '../../../src/components/BackButton';
import { PoppinsBold, PoppinsSemiBold, Typography }  from '../../../src/assets/styles/Typography';
import Cards from '../../../src/components/Cards';
import IcoBottonTL from '../../../src/components/IcoBottonTL';
import Botton from '../../../src/components/Botton';
import { Poppins_300Light, Poppins_500Medium } from '@expo-google-fonts/poppins';


const Screenwidth = Dimensions.get("window").width ;
const height = Dimensions.get("window").height;

const DetectionResults = ({route, navigation}) => {
    const {resultados} = route.params;
    let confianza = 0;
    let plaga = "";
    let diagnosisData = "";
    let text = "";
    let imagenesRelacionadas = [];

    if(resultados.plagas_detectadas && resultados.plagas_detectadas.length > 0 && resultados.plagas_detectadas[0].length > 0) {
        confianza = resultados.plagas_detectadas[0][0].confianza.toFixed(4) * 100;

        if (resultados.plagas_detectadas[0][0].plaga === "rona"){
            plaga = "Roña"
            text = "Es una enfermedad fúngica que afecta a los frutos, hojas y tallos de los árboles de aguacate."
            // Agregar imágenes relacionadas para la plaga "Roña"
            imagenesRelacionadas = [
                require("../../../src/assets/images/roña.png"),
                require("../../../src/assets/images/R1.png"),
                require("../../../src/assets/images/r2.png"),
                require("../../../src/assets/images/r3.png")
            ];
        } else if (resultados.plagas_detectadas[0][0].plaga === "quemado"){
            plaga = "Quemado"
            text = "El tizón de la hoja en Aguacate está causado principalmente por hongos (por ejemplo, las especies Colletotrichum y Cercospora). Estos patógenos pueden prosperar en condiciones húmedas e infectar la planta a través de heridas o aberturas naturales."
            // Agregar imágenes relacionadas para la plaga "Quemado"
            imagenesRelacionadas = [
                require("../../../src/assets/images/Q1.png"),
                require("../../../src/assets/images/s2.png"),
                require("../../../src/assets/images/Q3.png"),
                require("../../../src/assets/images/Q1.png"),
                require("../../../src/assets/images/Q3.png"),
    
            ];
        }else if (resultados.plagas_detectadas[0][0].plaga === "sano"){
            plaga = "Su aguacate esta sano"
            text = "Su cultivo no cuenta con ninguna plaga u enfermedad"
            // Agregar imágenes relacionadas para la plaga "Quemado"
            imagenesRelacionadas = [
                require("../../../src/assets/images/s1.png"),
                require("../../../src/assets/images/s2.png"),
                require("../../../src/assets/images/s3.png"),
                require("../../../src/assets/images/s1.png"),
                require("../../../src/assets/images/s3.png"),
    
            ];
        }else if (resultados.plagas_detectadas[0][0].plaga === "trips"){
            plaga = "Trips"
            text = "Los tisanópteros son un orden de pequeños insectos neópteros, llamados a veces trips, thrips o arañuelas. Suelen ser de color marrón o negro. Su alimentación es casi exclusivamente de vegetales o de hongos. Algunos son depredadores de otros artrópodos. Otros viven dentro de las agallas de coccoideos."
            // Agregar imágenes relacionadas para la plaga "Quemado"
            imagenesRelacionadas = [
                require("../../../src/assets/images/t1.png"),
                require("../../../src/assets/images/t2.png"),
                require("../../../src/assets/images/t3.png"),
                require("../../../src/assets/images/t1.png"),
                require("../../../src/assets/images/t3.png"),
    
            ];
        }else if (resultados.plagas_detectadas[0][0].plaga === "anillamiento"){
            plaga = "Anillamiento del pedunculo"
            text = "La ciencia ha encontrado que el problema está relacionado con el abatimiento de las reservas de almidón, y que ocurre cuando los picos de demanda no son satisfechos por las reservas del árbol; este desequilibrio suele presentarse 90-120 días antes de que la fruta sea abortada."
            // Agregar imágenes relacionadas para la plaga "Quemado"
            imagenesRelacionadas = [
                require("../../../src/assets/images/an1.png"),
                require("../../../src/assets/images/an2.png"),
                require("../../../src/assets/images/an3.png"),
                require("../../../src/assets/images/an1.png"),
                require("../../../src/assets/images/an3.png"),
    
            ];
        }
        diagnosisData = plaga;
    }else{
        plaga = "Ninguna?";
        text = "Esto no parece ser un aguacate... Regrese e inténte de nuevo";
        confianza = 0;  
        imagenesRelacionadas = [];
    }

    

    return (
        <ScrollView contentContainerStyle={{paddingBottom:120}} style={{flex: 1, backgroundColor: COLORS.gray2}}>
            <View style={{width: "100%"}}>
                <SafeAreaView style={{position: "absolute", zIndex: 20, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 46}}>
                <View style={{height: "auto", flexDirection: "row", justifyContent: "space-between", alignItems: 'center', width: '100%', paddingRight: 10}}>
                    <ImageBackground
                        style={{height:50, width:100}}
                        resizeMode='contain'
                        source={require("../../../src/assets/images/nameLogo.png")}/>
                    <BackButton onPress={()=>navigation.navigate("HomeScreen")}/>
                </View>
                        {/* <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 24, marginBottom: 20, color: COLORS.gray}}>TlalTec</Text>  */}
                {/* <BackButton onPress={()=>navigation.navigate("HomeScreen")} />   */}
                </SafeAreaView>


                <View style={{width: "100%", alignItems: "center", top: "25%"}}>
                    {resultados.imagen && <Image source={{ uri: 'data:image/jpeg;base64,' + resultados.imagen }} style={styles.imagen} />}
                    {/* <LinearGradient colors={["transparent", "rgba(218,224,237,0.1)", "rgba(218,224,237,1)"]}
                        style={{width: '100%', height: height * 0.3, position: "absolute", bottom: 0}}
                        start={{x: 0.5, y:0}}
                        end={{x: 0.5, y: 1}}
                        /> */}
                </View>

            </View>

            <ScrollView style={{marginTop: 100, backgroundColor: COLORS.gray2, height:"auto", borderRadius: 20}}>
                <Text style={{color: COLORS.dark2, textAlign: "center", fontSize: 34, fontFamily: "Poppins_600SemiBold", marginTop: 20}}>Plagas detectadas</Text>  
                <Text style= {{color: COLORS.green, textAlign: "center", fontSize: 24, fontFamily: "Poppins_600SemiBold"}}>Plaga: {plaga}</Text> 
                <Text style= {{color: COLORS.gray3, textAlign: "center", fontSize: 14, fontFamily: "Poppins_600SemiBold"}}>Confianza: {confianza} % </Text>
                <View style={{height: 131, marginTop: 28}}>
                    <Text style={{fontFamily: PoppinsSemiBold, fontSize: 17, paddingHorizontal: 25, textAlign: "justify", bottom: 15 }}>Imágenes Relacionadas: </Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                  {imagenesRelacionadas.map((imagen, index) => (
                    <Image key={index} source={imagen} style={{width: 100, height: 100, resizeMode: "center", marginLeft: index === 0 ? 0 : 10}}/>
                  ))}
                </ScrollView>
              </View>
                <Text style={{fontFamily: PoppinsBold, fontSize: 17, paddingHorizontal: 25, textAlign: "justify", top: 25 }}>Más Información sobre {plaga}</Text>
                <Text style={{fontFamily: "Poppins_500Medium", fontSize: 17, paddingHorizontal: 25, textAlign: "justify", top: 25, flexWrap: "wrap"}}>{text}</Text>
            </ScrollView>
            <View style={{marginTop: 56, marginBottom: 10, paddingHorizontal: 20}}>
                <Text style={{fontFamily: PoppinsSemiBold, fontSize: 15, textAlign: "justify", paddingBottom: 10, color: COLORS.gray3}}>Descubre como solucionarla</Text>
                <Botton title="Visitar Sistema Experto" filled style={ { backgroundColor: COLORS.dark}} onPress={() => navigation.navigate('GravedadScreen',  {diagnosisData})}S     />
          </View>
        </ScrollView>
    );
}

export default DetectionResults

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    imagen: {
        width: '90%',
        height: 400,
        borderRadius: 20,
    },
});
