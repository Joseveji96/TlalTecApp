import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native';
import { useFonts } from "expo-font";
import { Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import Botton from '../../../src/components/Botton';
import CheckBox from 'react-native-check-box'
import COLORS from '../../Constants/Color';
import BackButton from '../../../src/components/BackButton';
import TextInputTL from '../../../src/components/TextInputTL';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { createHuerto } from '../../../src/servises/huertos/huerto.servises';
import { CreateHuertoRecuest } from '../../../src/servises/huertos/models/huerto.models';
import { useAppContext } from '../../Contexts/App.context';

const AddHuertos = ({ navigation }) => {
  const [nameHuerto, setNameHuerto] = useState('');
  const [ubiHuerto, setUbiHuerto] = useState('');
  const [Latitud, setLatitud] = useState(19.7029369);
  const [Longitud, setLongitud] = useState(-103.4888096);

  const { token, usuario, setRefreshHuerto} = useAppContext ()

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setLatitud(coordinate.latitude);
    setLongitud(coordinate.longitude);
    setUbiHuerto(`Lat: ${coordinate.latitude}, Lng: ${coordinate.longitude}`);
  };

  function valuate(nameHuerto, Latitud, Longitud) {
		if (nameHuerto.length < 3) {
	   Alert.alert('Aviso', 'Introducir un nombre valido');
	 	} else {
      createHuerto({ id_Usuario: usuario._id, Nombre: nameHuerto, Latitud: Latitud, Longitud: Longitud, Organico: 'si', EtapaFenologica: 'si'}, token)
	      		.then((response) => {
	        	if (response.status !== 201) {
	          		throw new Error('Ocurrio un error');
	        	}
	        	return response.json();
	      	})
	      	.then((resposeJson) => {
	        	const response = resposeJson as CreateHuertoRecuest;
	        // Handle successful login
            setRefreshHuerto(true)
	        	navigation.navigate('HomeScreen');
            
	      	})
	      	.catch((error) => {
	        	Alert.alert('Error', error.message);
	      	});
	  	}
	}

  return (
    <SafeAreaView style={styles.Container}>
      <View style={{ marginHorizontal: 22, justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", marginTop: 42, marginBottom: 22 }}>
          <BackButton onPress={() => navigation.navigate("HomeScreen")} />
          <Text style={{ marginStart: 10, marginTop: 8, fontSize: 18, fontFamily: "Poppins_500Medium" }}>Información de tu huerto</Text>
        </View>
      </View>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 22, justifyContent: "space-between" }}>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Nombre del huerto</Text>
            <TextInputTL placeholder='Ingresa el nombre del huerto' onChangeText={(nameHuerto) => setNameHuerto(nameHuerto)} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Ubicación</Text>
          </View>

          <View style={{ height: 300, marginBottom: 10 }}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: Latitud,
                longitude: Longitud,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={handleMapPress}>
              <Marker
                coordinate={{
                  latitude: Latitud,
                  longitude: Longitud,
                }}
                title={"Ubicación del Huerto"}
                description={"Aquí está ubicado tu huerto"}/>
            </MapView>
          </View>

          <View style={{ marginBottom: 10 }}>
            <TextInputTL value={ubiHuerto} onChangeText={(ubiHuerto) => setUbiHuerto(ubiHuerto)} />
          </View>
          
           <Botton title="Guardar" filled style={{ backgroundColor: COLORS.dark }} onPress={() => {valuate( nameHuerto, Latitud, Longitud )}}/> 
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddHuertos;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "white",
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 10,
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
});