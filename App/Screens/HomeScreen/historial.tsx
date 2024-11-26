import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import Cards from '../../../src/components/Cards';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Historial({ navigation, route }) {
  const huerto = route.params?.huerto || {}; // Define un objeto vacío si route.params.huerto es undefined
  const [diagnosisList, setDiagnosisList] = useState([]);
  console.log("Nombre Huerto Historial: ", huerto.Nombre);

  // Definir la función `loadDiagnosis` como constante fuera de `useEffect`
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

  // Cargar los datos al montar el componente
  useEffect(() => {
    loadDiagnosis();
  }, []);

  // Filtrar los diagnósticos que coinciden con el huerto seleccionado
  const filteredDiagnosisList = diagnosisList.filter(
    (diagnosis) => diagnosis.huerto === huerto.Nombre
  );

  return (
    <View>
      <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 20, marginBottom: 10 }}>
        {'Historial de enfermedades'}
      </Text>

      <ScrollView scrollEventThrottle={10}>
        <View style={{ marginTop: 8 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredDiagnosisList.length > 0 ? (
              filteredDiagnosisList.map((diagnosis, index) => (
                <Cards
                  key={index}
                  name={diagnosis.name}
                  stage={diagnosis.stage}
                  organic={diagnosis.organic}
                  date={diagnosis.date}
                  infestationLevel={diagnosis.infestationLevel}
                  huerto={diagnosis.huerto}
                  onPress={() => {
                    navigation.navigate('GravedadScreen', { diagnosisData: diagnosis });
                  }}
                />
              ))
            ) : (
              <Text>No hay diagnósticos recientes para este huerto.</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
