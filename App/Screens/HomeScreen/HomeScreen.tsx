import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../Constants/Color'
import { useAppContext } from '../../Contexts/App.context';
import { getHuertosByIdUser } from '../../../src/servises/huertos/huerto.servises';
import { Huertos, HuertosList } from '../../../src/servises/huertos/models/huerto.models';
import HuertoCard from '../../../src/components/HuertoCard';
import IconButton from '../../../src/components/IcoBottonTL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardA from '../../../src/components/CardA';


const HomeScreen = ({navigation}) => {
  const [results, setResults] = useState<Huertos[]>([]);
  const [diagnosisList, setDiagnosisList] = useState([]);
  const { token, usuario, setToken, refreshHuerto, setRefreshHuerto, setHuerto } = useAppContext()

  const loadDiagnosis = async () => {
    try {
      const storedData = await AsyncStorage.getItem('diagnosisList');
      if (storedData) {
        setDiagnosisList(JSON.parse(storedData));
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los diagnósticos.");
      console.error("Error al cargar diagnósticos:", error);
    }
  };

  const saveHuertosToFile = async (huertos: any[]) => {
    try {
      // Crear un array con solo los nombres de los huertos
      const huertosNames = huertos.map(huerto => huerto.Nombre);
      
      // Guardar los nombres de los huertos en AsyncStorage
      await AsyncStorage.setItem('huertosNames', JSON.stringify(huertosNames));
      
      // Verificar si se guardaron los datos correctamente
      console.log("Huertos guardados:", huertosNames);
      Alert.alert("Guardado", "Los nombres de los huertos han sido guardados exitosamente.");
    } catch (error) {
      console.error("Error al guardar los huertos:", error);
      Alert.alert("Error", "Hubo un problema al guardar los huertos.");
    }
  };

  useEffect(() => {
    loadDiagnosis();
    getHuertosByIdUser(usuario._id, token)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('No se encontraron huertos registrados');
        }
        return response.json();
      })
      .then((responseJson) => {
        const response = responseJson as HuertosList;
        
        // Guardamos los huertos en AsyncStorage
        saveHuertosToFile(response.huertos); // Llamar a la función para guardar los huertos
        
        // Actualizamos el estado de los huertos
        setResults(response.huertos);
        
        // Guardando el token de la sesión
        setToken(response.token);

        navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  }, []);

   useEffect(() => {
    if (refreshHuerto === true) {
      loadDiagnosis();
      getHuertosByIdUser(usuario._id, token)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('No se encontraron huertos registrados');
          }
          return response.json();
        })
        .then((responseJson) => {
          const response = responseJson as HuertosList;
          
          // Guardamos los huertos en AsyncStorage
          saveHuertosToFile(response.huertos); // Llamar a la función para guardar los huertos
          
          // Actualizamos el estado de los huertos
          setResults(response.huertos);
          
          // Guardando el token de la sesión
          setToken(response.token);

          setRefreshHuerto(false);
          navigation.navigate('HomeScreen');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
          setRefreshHuerto(false);
        });
    }
  }, [refreshHuerto]);
  return (
    <SafeAreaView style={styles.Container}>
      <View style={{ flex: 1, marginHorizontal: 22, justifyContent: "space-between" }}>
        {/* Encabezado */}
        <View style={{ marginTop: 56, marginBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 24 }}>TlalTec</Text>
          <IconButton onPress={() => console.log("Hola")} iconSource={require("../../../src/assets/icons/Search.png")} iconSize={24} />
        </View>

        {/* Sección de botones */}
        <View style={{ flexDirection: "row", height: 120, width: "100%", justifyContent: "space-between", marginBottom: 15, gap: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("AllDiagnostics")} style={{ flex: 1 }}>
            <Image source={require("../../../src/assets/images/btnSE.png")} style={{ width: "100%", height: 120, resizeMode: "contain" }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")} style={{ flex: 1 }}>
            <Image source={require("../../../src/assets/images/btnVA.png")} style={{ width: "100%", height: 120, resizeMode: "contain" }} />
          </TouchableOpacity>
        </View>
        {/* <ScrollView scrollEventThrottle={16}>
              <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{ fontSize: 18, fontFamily: "Poppins_500Medium" }}>Enfermedades Recientes</Text>
              </View>

              <View style={{ height: 290, marginTop: 8 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {diagnosisList.map((diagnosis, index) => (
                    <CardA
                      key={index}
                      name={diagnosis.name}
                      stage={diagnosis.stage}
                      organic={diagnosis.organic}
                      date={diagnosis.date}
                      infestationLevel={diagnosis.infestationLevel} // Asegúrate de incluir este valor
                      onPress={() => {
                        navigation.navigate('GravedadScreen', { diagnosisData: diagnosis });
                      }} // Manejar el clic para navegar a GravedadScreen
                    />
                  ))}
                </ScrollView>
              </View>
        </ScrollView> */}

        {/* Separador */}
        <View style={{ width: "100%", height: 1, backgroundColor: "#EBEBEB", marginBottom: 15 }} />

        {/* Título de la sección de huertos */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium" }}>Mis Huertos</Text>
          <Text onPress={() => navigation.navigate("AddHuertos")} style={styles.masLink}>Añadir Huerto</Text>
        </View>

        {/* ScrollView para los huertos */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10 }}
          scrollEventThrottle={10}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 8 }}>
            {results.length > 0 && results.map((huerto, index) => (
              <View key={index} style={{ marginTop: 10 }}>
                <TouchableOpacity onPress={() => { setHuerto(huerto); navigation.navigate('DetalleHuertoScreen', { huerto }); }}>
                  <HuertoCard
                    imageTemp={require("../../../src/assets/icons/humedad.png")}
                    imageHmdd={require("../../../src/assets/icons/termometro.png")}
                    imageHuerto={require("../../../src/assets/images/Fondo.png")}
                    huerto={huerto}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen


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
    backgroundColor:COLORS.gray2,
    borderRadius: 30,
    width: 60,
    height: 60,
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
    alignItems: "center",
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: "#1E232C",
  },
  loginAltButton: {
    backgroundColor: "#ffffff",
    borderColor: "#1E232C",
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
  },
  masLink: {
    fontSize: 14, 
    color: COLORS.green, 
    fontFamily: "Poppins_600SemiBold", 
    textDecorationLine: "underline"
  }
})
