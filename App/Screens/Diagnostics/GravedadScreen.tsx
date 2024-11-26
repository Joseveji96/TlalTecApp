import { View, Text, SafeAreaView, StyleSheet, ScrollView, Alert, Button, TouchableOpacity} from 'react-native'
import { useState, useEffect } from 'react';
import Checkbox from 'react-native-check-box'
import COLORS from '../../Constants/Color';
import BackButton from '../../../src/components/BackButton';
import { ResultContextProvider } from './ResultContext';
import React from 'react';
import { format, parse } from 'date-fns'; // Si no tienes date-fns
import AsyncStorage from '@react-native-async-storage/async-storage';


const GravedadScreen = ({ navigation, route }) => {
  const { diagnosisData } = route.params || {};
  const diagnosis = diagnosisData?.name;
  const [huertos, setHuertos] = useState(false);
  const [huertoNombre, sethuertoNombres] = useState();
  const [vista, setVista] = useState(false);

  // Opciones areas
  const [Organico, setOrganico] = useState(false);
  const [EtapaFeno, setEtapaFeno] = useState(false);

  // Opciones Nivel Infestacion
  const [Medio, setMedio] = useState(false);
  const [Alto, setAlto] = useState(false);

  // Opciones Etapa Fenológica
  const [FlujoVege, setFlujoVege] = useState(false);
  const [DesaFloral, setDesaFloral] = useState(false);
  const [Amarre, setAmarre] = useState(false);
  const [CresFruto, setCresFruto] = useState(false);
  const [Cosecha, setCosecha] = useState(false);

  const [huertosNames, setHuertosNames] = useState<string[]>([]);

  // Cargar los huertos desde AsyncStorage cuando el componente se monte
  useEffect(() => {
    const loadHuertos = async () => {
      try {
        const storedHuertos = await AsyncStorage.getItem('huertosNames');
        if (storedHuertos) {
          // Si los huertos están guardados, los parseamos y los mostramos
          const huertosArray = JSON.parse(storedHuertos);
          setHuertosNames(huertosArray); // Guardamos los huertos en el estado
        } else {
          Alert.alert('Aviso', 'No hay huertos guardados en el archivo.');
        }
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al cargar los huertos.');
        console.error('Error al cargar huertos:', error);
      }
    };

    loadHuertos();
  }, []);

  const isDateInRange = (date, start, end) => date >= start && date <= end;

  // Configuración inicial basada en `diagnosisData`
  useEffect(() => {
    if (diagnosisData) {
      setOrganico(diagnosisData.organic);
      setEtapaFeno(diagnosisData.stage);
      diagnosis==(diagnosis.name);
      
      // Ajustar niveles de infestación
      if (diagnosisData.infestationLevel === "Critico") {
        setAlto(true);
      } else if (diagnosisData.infestationLevel === "Moderado") {
        setMedio(true);
      }
      
    }
  }, [diagnosisData]);

  useEffect(() => {
    const today = new Date();

    // Convertimos las fechas de los rangos a objetos de fecha
    const flujoVegeStart = parse('2024-02-01', 'yyyy-MM-dd', new Date());
    const flujoVegeEnd = parse('2024-03-31', 'yyyy-MM-dd', new Date());

    const desaFloralStart = parse('2024-12-01', 'yyyy-MM-dd', new Date());
    const desaFloralEnd = parse('2024-02-28', 'yyyy-MM-dd', new Date());

    const amarreStart = parse('2024-02-01', 'yyyy-MM-dd', new Date());
    const amarreEnd = parse('2024-03-31', 'yyyy-MM-dd', new Date());

    const cresFrutoStart = parse('2024-04-01', 'yyyy-MM-dd', new Date());
    const cresFrutoEnd = parse('2024-09-30', 'yyyy-MM-dd', new Date());

    const cosechaStart = parse('2024-10-01', 'yyyy-MM-dd', new Date());
    const cosechaEnd = parse('2025-01-31', 'yyyy-MM-dd', new Date());

    // Usamos sentencias if para cada rango fenológico
    if (isDateInRange(today, flujoVegeStart, flujoVegeEnd)) {
      setFlujoVege(true);
    }
    
    if (isDateInRange(today, desaFloralStart, desaFloralEnd)) {
      setDesaFloral(true);
    }

    if (isDateInRange(today, amarreStart, amarreEnd)) {
      setAmarre(true);
    }

    if (isDateInRange(today, cresFrutoStart, cresFrutoEnd)) {
      setCresFruto(true);
    }

    if (isDateInRange(today, cosechaStart, cosechaEnd)) {
      setCosecha(true);
    }
  }, []);

  const saveDiagnosis = async () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const selectedStage = [
      FlujoVege && "Flujo Vegetativo",
      DesaFloral && "Desarrollo Floral",
      Amarre && "Amarre",
      CresFruto && "Crecimiento del Fruto",
      Cosecha && "Cosecha",
    ].filter(Boolean).join(", ");

    const infestationLevel = [
      Medio && "Moderado",
      Alto && "Critico",
    ].filter(Boolean).join(", ");

    const newDiagnosisData = {
      name: diagnosis,
      stage: selectedStage,
      organic: Organico,
      date: today,
      infestationLevel,
      huerto: huertoNombre,
      
    };

    try {
      const storedData = await AsyncStorage.getItem('diagnosisList');
      const diagnosisList = storedData ? JSON.parse(storedData) : [];
      diagnosisList.push(newDiagnosisData);
      
      await AsyncStorage.setItem('diagnosisList', JSON.stringify(diagnosisList));
      Alert.alert("Guardado", "El diagnóstico ha sido guardado exitosamente.");

      // Console log para ver los datos guardados
      console.log("Diagnóstico guardado:", newDiagnosisData);
      console.log("Lista completa de diagnósticos:", diagnosisList);
      navigation.navigate("HomeScreen")
    } catch (error) {
      console.error("Error al guardar el diagnóstico:", error);
      Alert.alert("Error", "Hubo un problema al guardar el diagnóstico.");
    }
  };

  const valuate = (huerto) => {
    sethuertoNombres(huerto); // Actualizar el estado con el nombre del huerto
    console.log(huerto); // Aquí se muestra el valor seleccionado
    Alert.alert("Huerto Seleccionado", `Has seleccionado el huerto: ${huerto}`);
  };

  const Limpiar = () => {
    setVista(true)
  };

  const regresar = () => {
    setVista(false)
  };
  

  return (
    
    <SafeAreaView style={styles.Container}>
      <View style={{ marginHorizontal: 22, justifyContent: "space-between"}}>        
        <View style={{flexDirection: "row", marginTop: 40, marginBottom: 12}}>
          
          <BackButton onPress={()=>{navigation.goBack()}}/>

        </View>

        <View>
        <Text style={{fontSize: 22, fontFamily:"Poppins_500Medium"}}>{diagnosis}</Text>
          <Text style={{fontSize: 14, fontFamily:"Poppins_500Medium", marginTop: 10}}>Sintomas seleccionados:</Text>

          {diagnosis === 'Barrenador de pequeño hueso del aguacate' && (<View ><Text>Lesiones en forma de medialuna (Fruto), Sudoracion (Fruto), Larvas (Fruto), Perforaciones (Fruto) </Text></View>)}
          {diagnosis === 'Barrenador de tronco y ramas del aguacate' && (<View ><Text>Aborto (Fruto) && Defolicion (Hoja) && Perforaciones (Tronco) && Residuos en Perforaciones (Tronco), Ramas Secas (Tronco), Aborto (Flor) </Text></View>)}
          {diagnosis === 'Barrenador grande de la semilla del Aguacate' && (<View ><Text>Perforaciones (Fruto), Secrecion Blanca (Fruto), Aborto (Fruto)</Text></View>)}
          {diagnosis === 'Palomilla barrenadora del aguacate (ácaro)' && (<View ><Text>Manchas Blancas (Fruto), Perforaciones (Fruto), Residuos en Perforaciones (Fruto), Perforaciones (Tronco), Residuos en Perforaciones (Tronco)</Text></View>)}
          {diagnosis === 'Trips' && (<View ><Text>Protuberancias (Fruto), Deformacion (Fruto), Rugosidad (Fruto), Decoloracion (Hoja), Quebradiza (Hoja), Aborto (Flor)</Text></View>)}
          {diagnosis === 'Araña roja' && (<View ><Text>Color Rojizo (Fruto),  Deformacion (Fruto),  Deformacion (Hoja),  Color Rojizo (Hoja),  Telarañas (Hoja),  Color Rojizo (Tronco),  Deformacion (Flor),  Color Rojizo (Flor)</Text></View>)}
          {diagnosis === 'Gusano telarañero o enrollador de hoja' && (<View ><Text>Roen (Fruto), Gusano Verde/Amarillo (Fruto), Telarañas (Fruto), Roen (Hoja), Gusano Verde/Amarillo (Hoja), Telarañas (Hoja)</Text></View>)}
          {diagnosis === 'Araña blanca, cristalina o telarañera' && (<View ><Text>Deformacion (Fruto), Telarañas (Fruto), Decoloracion (Hoja), Puntos Color Verde Oscuro (Hoja), Defolicion (Hoja), Telarañas (Hoja)</Text></View>)}
          {diagnosis === 'Ambrosiales' && (<View ><Text>Presencia de Escarabajo (Fruto), Presencia de Escarabajo (Hoja), Marchitez (Hoja), Presencia de Escarabajo (Tronco), Perforaciones (Tronco), Tubos Cortos de Aserrin (Tronco)</Text></View>)}
          {diagnosis === 'Mosca ovario' && (<View ><Text>Deformacion (Fruto), Aborto (Fruto), Perforaciones (Fruto)</Text></View>)}
          {diagnosis === 'Hormigas atta' && (<View ><Text>Presencia de Hormigas (Fruto), Roen (Hoja), Presencia de Hormigas (Tronco),  Presencia de Hormigas (Flor)</Text></View>)}
          {diagnosis === 'Gallina ciega' && (<View ><Text>Presencia de Escarabajo (Fruto), Color Amarillento (Hoja), Presencia de Escarabajo (Tronco), Larva (Tronco)</Text></View>)}
          {diagnosis === 'Roña' && (<View ><Text>Manchas Oscuras (Fruto), Rugosidad (Fruto), Decoloracion (Fruto)</Text></View>)}
          {diagnosis === 'Cáncer o cancro' && (<View ><Text>Ulceras (Tronco), Secrecion Blanca (Tronco)</Text></View>)}
          {diagnosis === 'Tristeza del aguacatero' && (<View ><Text>Muerte (Fruto), Disminución de producción (Fruto), Marchitez (Hoja), Lesiones (Tronco), Muerte (Tronco), Cresimiento Lento (Tronco), Muerte (Flor)</Text></View>)}
          {diagnosis === 'Pudrición del cuello y raíz' && (<View ><Text>Muerte (Fruto) && Disminución de producción (Fruto) && Marchitez (Hoja) && Descomposición inferior del tronco (Tronco)</Text></View>)}
          {diagnosis === 'Fumagina' && (<View ><Text>Recubrimiento Negro y Polvoriento (Fruto), Recubrimiento Negro y Polvoriento (Hoja), Recubrimiento Negro y Polvoriento (Tronco)</Text></View>)}
          {diagnosis === 'Antracnosis' && (<View ><Text>Manchas Oscuras (Fruto), Lesiones (Fruto), Marchitez (Fruto), Marchitez (Hoja)</Text></View>)}
          {diagnosis === 'Viroide' && (<View ><Text>Decoloracion (Fruto), Lesiones (Fruto), Marchitez (Fruto), Marchitez (Hoja)</Text></View>)}
          {diagnosis === 'Anillamiento de pedúnculo' && (<View ><Text>Daño en pedúnculo (Fruto), Muerte (Fruto), Disminución de producción (Fruto)</Text></View>)}

          <Text style={{fontSize: 14, fontFamily:"Poppins_500Medium", marginTop: 10}}>Seleccione campos obligatorios marcados con *</Text>

          <View style={{}}>
            {!vista && (
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={{flex: 1, padding: 10}}
                onClick={() => setOrganico(!Organico)}
                isChecked={Organico}
                rightText={"Cultivo orgánico"}
              />
              <Checkbox
                style={{flex: 1, padding: 10}}
                onClick={() => setEtapaFeno(!EtapaFeno)}
                isChecked={EtapaFeno}
                rightText={"*Etapa fenológica*"}
              />
            </View>
            )}
          </View>
        </View>
      </View>

      
        <View style={{flex: 1, marginHorizontal: 22, justifyContent: "space-between"}}>
          <View>
              
            <ScrollView scrollEventThrottle={1}>
              <View style={styles.Container}>
                
                <View style={{}}>
                  {vista && ( 
                  <Text>* Selecciona el huerto al que pertenese *</Text>)}
                </View>

                <View style={styles.ContainerBackground}>
                  {vista && ( 
                  huertosNames.length > 0 ? (
                    huertosNames.map((huerto, index) => (
                      <View style={{ margin: 10}}> 
                        <TouchableOpacity onPress={() => {valuate(huerto)}}>
                          <Text key={index} style={{ marginVertical: 5 }}>
                            {huerto}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))
                  ) : (
                    <Text>No hay huertos guardados.</Text>
                  ))}
                </View>
                
                <View style={styles.ContainerBackground}>
                  {EtapaFeno && !vista &&(

                    <View style={{ marginTop: 10}}> 
                      <Text>    Etapa Fenológica</Text> 

                      <View style={styles.checkboxContainer}>
                        <Checkbox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setFlujoVege(!FlujoVege)}
                          isChecked={FlujoVege}
                          rightText={"Flujo Vegetativo"}
                        />
                        <Checkbox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setDesaFloral(!DesaFloral)}
                          isChecked={DesaFloral}
                          rightText={"Desarrollo Floral"}
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <Checkbox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setAmarre(!Amarre)}
                          isChecked={Amarre}
                          rightText={"Amarre"}
                        />
                        <Checkbox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setCresFruto(!CresFruto)}
                          isChecked={CresFruto}
                          rightText={"Crecimiento del Fruto"}
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <Checkbox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setCosecha(!Cosecha)}
                          isChecked={Cosecha}
                          rightText={"Cosecha"}
                        />
                      </View>

                    </View>
                  
                  )}
                </View>

                <View style={styles.ContainerBackground}>
                  {(FlujoVege || DesaFloral || Amarre || CresFruto || Cosecha) &&  !vista &&(
                    <View style={{ marginTop: 10}}> 
                      <Text>    Nivel de Infestación</Text> 
                      <View style={styles.checkboxContainer}>
                        
                        <Checkbox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setMedio(!Medio)}
                          isChecked={Medio}
                          rightText={"Moderado"}
                        />
                        <Checkbox
                          style={{flex: 1,padding: 10}}
                          onClick={() => setAlto(!Alto)}
                          isChecked={Alto}
                          rightText={"Critico"}
                        />
                      </View>

                      <View >
                        {(diagnosis === 'Trips' || diagnosis === 'Araña roja' || 
                        diagnosis === 'Araña blanca, cristalina o telarañera' || diagnosis === 'Mosca ovario') &&  (FlujoVege || DesaFloral) &&(
                          <View> 
                            <Text>    * Número de insectos 1 a 10 (presencia moderada) {'\n'}    * Número de insectos mayor a 10 (presencia critica)</Text> 
                          </View>
                        )}
                      </View>
                      <View >
                        {diagnosis === 'Trips' &&  (Amarre || CresFruto || Cosecha) &&(
                          <View> 
                            <Text>    * Número de insectos 1 a 5 (presencia moderada) {'\n'}    * Número de insectos mayor a 5 (presencia critica)</Text> 
                          </View>
                        )}
                      </View>

                      <View >
                        {diagnosis === 'Araña roja' &&  (Amarre || CresFruto || Cosecha) &&(
                          <View> 
                            <Text>    * Número de insectos 1 a 2 (presencia moderada) {'\n'}    * Número de insectos mayor a 2 (presencia critica)</Text> 
                          </View>
                        )}
                      </View>

                      <View >
                        {(diagnosis === 'Gusano telarañero o enrollador de hoja' || diagnosis === 'Gallina ciega') &&  (FlujoVege || DesaFloral || 
                          Amarre || CresFruto || Cosecha) &&(
                          <View> 
                            <Text>    * Número de insectos 1 a 10 (presencia moderada) {'\n'}    * Número de insectos mayor a 10 (presencia critica)</Text> 
                          </View>
                        )}
                      </View>

                      <View >
                        {diagnosis === 'Araña blanca, cristalina o telarañera' &&  (Amarre || CresFruto || Cosecha) &&(
                          <View> 
                            <Text>    * Número de insectos 1 a 2 (presencia moderada) {'\n'}    * Número de insectos mayor a 2 (presencia critica)</Text> 
                          </View>
                        )}
                      </View>

                      <View >
                        {diagnosis === 'Mosca ovario' &&  Amarre  &&(
                          <View> 
                            <Text>    * Número de insectos 1 a 2 (presencia moderada) {'\n'}    * Número de insectos mayor a 2 (presencia critica)</Text> 
                          </View>
                        )}
                      </View>
                      <View >
                        {diagnosis === 'Mosca ovario' &&  (CresFruto || Cosecha) &&(
                          <View> 
                            <Text>    * Número de insectos 1 a 5 (presencia moderada) {'\n'}    * Número de insectos mayor a 5 (presencia critica)</Text> 
                          </View>
                        )}
                      </View>

                      <View >
                        {diagnosis === 'Hormigas atta' &&  FlujoVege &&(
                          <View> 
                            <Text>    * Número de insectos 1 a 2 (presencia moderada) {'\n'}    * Número de insectos mayor a 2 (presencia critica)</Text> 
                          </View>
                        )}
                      </View>
                      <View >
                        {diagnosis === 'Hormigas atta' &&  ( DesaFloral || 
                          Amarre || CresFruto || Cosecha) &&(
                          <View> 
                            <Text>    * Número de insectos 1 a 10 (presencia moderada) {'\n'}    * Número de insectos mayor a 10 (presencia critica)</Text> 
                          </View>
                        )}
                      </View>

                      <View >
                        {diagnosis === 'Ambrosiales' &&  (FlujoVege || DesaFloral || 
                          Amarre || CresFruto || Cosecha) &&(
                          <View> 
                            <Text>    * Número de insectos 1 a 15 (presencia moderada) {'\n'}     * Número de insectos mayor a 15 (presencia critica)</Text> 
                          </View>
                        )}
                      </View>
                      
                      <View >
                        {(diagnosis === 'Roña' || diagnosis === 'Cáncer o cancro' || diagnosis === 'Tristeza del aguacatero' ||
                          diagnosis === 'Pudrición del cuello y raíz' || diagnosis === 'Fumagina' || diagnosis === 'Antracnosis' ||
                          diagnosis === 'Viroide' || diagnosis === 'Anillamiento de pedúnculo') &&  (FlujoVege || DesaFloral || 
                          Amarre || CresFruto || Cosecha) &&(
                          <View> 
                            <Text>    * 1 a 2 arboles infestados (presencia moderada) {'\n'}    * Mayor a 2 arboles infestados (presencia critica)</Text> 
                          </View>
                        )}
                      </View>

                      <View style={{marginBottom:10}}></View>

                    </View>
                  )}
                </View>
                
                

              </View>
              
              
              <View>
              { !vista &&(
                <View style={{ marginTop: 16}}>
                  <Text style={{ fontSize: 18, marginBottom: 16 }}>Recomendaciones</Text>
                  <Text style={{ marginBottom: 10 }}>Cultural</Text>
                  <ResultContextProvider>

                    <View style={styles.Container}>
                      {diagnosis === 'Barrenador de pequeño hueso del aguacate' && !vista &&(
                        <View >
                          <Text>Recolectar los frutos dañados adheridos al árbol o caídos, 
                            quemarlos o enterrarlos en el suelo a una profundidad no menor 
                            a 1 metro con cal para evitar brote de los huevesillos</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Barrenador de tronco y ramas del aguacate' && !vista &&(
                        <View >
                          <Text>A través de la poda sanitaria. Las ramas podadas deben 
                            ser incineradas para eliminar huevos, larvas y pupas</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Barrenador grande de la semilla del Aguacate' && !vista &&(
                        <View >
                          <Text>Recolectar los frutos dañados adheridos al 
                            árbol o caídos, quemarlos o enterrarlos en el suelo a una profundidad 
                            no menor a 1 metro con cal para evitar brote de los huevesillos.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Palomilla barrenadora del aguacate (acaro)' && !vista &&(
                        <View >
                          <Text>Recolectar los frutos dañados adheridos al árbol o caídos, 
                            quemarlos o enterrarlos en el suelo a una profundidad no menor 
                            a 1 metro con cal para evitar brote de los huevesillos.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Trips' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Mantener una buena ventilación de los árboles.  Podas de aclareo para eliminar las partes dañadas. 
                            {'/n'}Mantener un monitoreo permanente con el método de la hoja de papel para determinar su presencia y nivel de infestación. </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Araña roja' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>El riego por aspersión a campo abierto, 
                            al igual que los nebulizadores afectan a las poblaciones, 
                            la alta humedad relativa también reduce la incidencia de los ácaros. </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Gusano telarañero o enrollador de hoja' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Recoger hojas y frutos afectados ya que si se ve el daño normalmente ella se encuentra en ellos protegida por una seda. 
                            Se encuentran por focos y su distribución es muy lenta y poco persistente, 
                            por lo que el control cultural puede bastar para reducir daños. </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Araña Blanca, cristalina o telarañera' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>El riego por aspersión a campo abierto, 
                            al igual que los nebulizadores afectan a las poblaciones, 
                            la alta humedad relativa también reduce la incidencia de los ácaros. </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Ambrosiales' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Realizar podas, trituración y quema de partes vegetales dañadas, en árboles que muestren daño evidente, 
                            con la finalidad de destruir las larvas, pupas y adultos dentro de ramas, y evitar la diseminación del patógeno.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Mosca ovario' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Se recomienda eliminar el pasto dentro y en los bordes de los cultivos 
                            y efectuar un buen control de malezas. Colocar trampas pegajosas. </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Roña' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Eliminación de frutos afectados y ramas secas. Recolección antes de que el fruto caiga al suelo. 
                            Podas de aclareo, que permitan mayor luminosidad y aireación a los árboles. </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Cáncer o Cancro' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Nivelar el suelo mínimo 1 vez al año para evitar depresiones que favorezcan el encharcamiento y/o mejorar el drenaje del terreno.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Tristeza del aguacatero' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Nivelar el suelo mínimo 1 vez al año para evitar depresiones que favorezcan el encharcamiento y/o mejorar el drenaje del terreno.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Pudrición del cuello y raíz' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Nivelar el suelo mínimo 1 vez al año para evitar depresiones que favorezcan el encharcamiento y/o mejorar el drenaje del terreno.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Fumagina' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Podar los brotes y ramas adecuadamente.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Antracnosis' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Mantener la parcela limpia de restos vegetales y frutos caídos para evitar la propagación del hongo. Realizar poda de aclareo para mayor luminosidad y aireación, 
                            eliminando las ramas afectadas y sellando las heridas. En postcosecha, no superar temperaturas de 24 ºC.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Viroide' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Eliminar todas las áreas infestadas, incluyendo árboles.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Anillamiento de pedúnculo' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text></Text>
                        </View>
                      )}
                    </View>

                  </ResultContextProvider>
                </View>
              )}
              </View>

              <View>
              { !vista &&(
                <View style={{ marginTop: 10}}>
                  <Text style={{ marginBottom: 10 }}>Biológico</Text>
                  <ResultContextProvider>
                    
                    <View style={styles.Container}>
                      {diagnosis === 'Barrenador de pequeño hueso del aguacate' && !vista &&(
                        <View>
                          <Text>Beauveria bassiana 0.25 –0.50 Kg/ha. {'\n'}Metarhizium anisopliae  0.25 –0.50 Kg/ha.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Barrenador de tronco y ramas del aguacate' && !vista &&(
                        <View >
                          <Text>Parasitoides, Braconidae (Hymenoptera: Braconidae) 
                            presente de manera natural en huertos de aguacate es un enemigo natural.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Barrenador grande de la semilla del Aguacate' && !vista &&(
                        <View >
                          <Text>Beauveria bassiana 0.25 –0.50 Kg/ha.  
                          {'\n'}Metarhizium anisopliae  0.25 –0.50 Kg/ha. 
                          {'\n'}Bacillus thuringiensis  0.25 –0.50 Kg/ha.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Palomilla barrenadora del aguacate (acaro)' && !vista && (
                        <View >
                          <Text>Larvas de S. catenifer principalmente por Apanteles sp. 
                            Especies del género apanteles. Trichogramma pretiosum Riley, T. 
                            bruni Nagaraja y Trichogrammatoides annulata DeSantis, parasitan 
                            huevos de esta plaga.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Trips' && (Medio || Alto)  && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Argemonina, Berberina, Ricina y α-
                          Terthienil en Dosis: 1 a 5 ml / litro de agua. 
                          {'\n'}Azadiractina dosis 530 L/ha de agua. 
                          {'\n'}Beauveria bassiana 0.25 –0.50 Kg/ha. </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Araña roja' && (Medio || Alto)  && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Argemonina, Berberina, Ricina y α-
                          Terthienil en Dosis: 1 a 5 ml / litro de agua. 
                          {'\n'}Beauveria bassiana dosis 0.25 –0.50 Kg/ha. 
                          {'\n'}Geraneol+Citronellol+Nerolidol+Farnesol dosis 1.0 a 1.5 litro/ha. y los insectos de la familia Phytoseiidae.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Gusano telarañero o enrollador de hoja' && (Medio || Alto)  && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Bioinsecticida Bacillus Thuringiensis 3 g/L de agua con pH entre: 5.5 y 6.0 </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Araña Blanca, cristalina o telarañera' && (Medio || Alto)  && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Argemonina, Berberina, Ricina y α-Terthienil en Dosis: 1 a 5 ml / litro de agua. 
                          {'\n'}Beauveria bassiana dosis 0.25 –0.50 Kg/ha. 
                          {'\n'}Geraneol+Citronellol+Nerolidol+Farnesol dosis 1.0 a 1.5 litro/ha. y los insectos de la familia Phytoseiidae.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Mosca ovario' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Aceite vegetal de soya dosis 2 - 4 L/ha </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Hormigas atta' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Beauveria bassiana 0.25 –0.50 Kg/ha.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Gallina ciega' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Metarhi zium aniso liae</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Tristeza del aguacatero' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Trichoderma harzianum dosis 400-800g/ha.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Fumagina' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Extracto de Reynoutria Sachalinensis en Dosis :0.3 L/cil.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Antracnosis' && (Medio || Alto) && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Bacillus subtilis dosis 1.0-3.0 L/Ha. 
                            {'/n'}Extracto de gobernadora (Larrea tridentata) dosis 4.0 - 6.0 L/ha. 
                            {'/n'}Bacillus amyloliquefaciens  dosis 1-2 L/ha.</Text>
                        </View>
                      )}
                    </View>

                  </ResultContextProvider>
                </View>
              )}
            </View>

            <View>
              { !vista &&(
                <View style={{ marginTop: 10}}>
                  <Text style={{ marginBottom: 10 }}>Químico</Text>
                  <ResultContextProvider>

                    <View style={styles.Container}>
                      {diagnosis === 'Barrenador de pequeño hueso del aguacate' && !vista &&(
                        <View style={{ marginTop: 10 }}>
                          <Text>Permetrina Dosis 200-300 ml/ 1000L de agua.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Barrenador de tronco y ramas del aguacate' && !vista &&(
                        <View >
                          <Text>Bacillus thuringiensis y Malatión DOSIS LITROS/HA 250 ml/100 L de agua.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Barrenador grande de la semilla del Aguacate' && !vista &&(
                        <View >
                          <Text>Permetrina Dosis 200-300 ml/ 1000L de agua.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Palomilla barrenadora del aguacate (acaro)' && !vista &&(
                        <View >
                          <Text>Permetrina Dosis 200-300 ml/ 1000L de agua.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Trips' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Clorantraniliprol + Lambda-Cyalotrina en Dosis: 200 - 400 ml en 1000L de agua. Tiamethoxam + Permetrina. 
                          {'\n'}Zeta-Cipermetrina en Dosis: 40-45 mL/100 L de agua. 
                          {'\n'}Tiametoxam en Dosis: 0.15-0.20 kg/ha Acetamiprid en Dosis: 150 – 350 mL/1000 L de agua.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Araña roja' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Abamectina en Dosis: 50 – 150 mL / 100 L de agua.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Gusano telarañero o enrollador de hoja' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Clorantraniliprol en Dosis: 100-200 ML / HA. </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Araña Blanca, cristalina o telarañera' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Abamectina en Dosis: 50 – 150 mL / 100 L de agua.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Ambrosiales' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Malation 50% CE, Permetrina 33.66% CE, Lambda cyalotrina 6.50 % CE, Tiametoxam + lambda-cyalotrina, Zeta-cipermetrina.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Mosca ovario' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Permetrina Dosis 200-300 ml/ 1000L de agua.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Hormigas atta' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Clorpirifós pueden aplicarse dosis de 0.3 a 0.5 cc por m2 de hormiguero. </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Gallina ciega' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>METASAVEM el cual se sugiere aplicar una mezcla líquida hecha con 400 gramos de producto disueltos en 200 litros de agua. </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Roña' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Benomilo, Oxido  cuproso, Oxicloruro de CU.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Cáncer o Cancro' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>CopperGreen. Ingrediente activo: Oxicloruro de cobre</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Tristeza del aguacater' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Fosetil-AL en Dosis: 0.2-0.4 kg/100 L de agua. 
                            {'/n'}Metalaxil en Dosis: 2 a 5 l/ha. 
                            {'/n'}Fosetil Aluminio en Dosis: 3.5-4.5 Kg/ha.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Pudrición del cuello y raíz' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Ridomil 2E, Ridomil 50w, Ridomil 5G.</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.Container}>
                      {diagnosis === 'Antracnosis' && Alto && !Organico && (FlujoVege || DesaFloral || 
                            Amarre || CresFruto || Cosecha) && !vista &&(
                        <View >
                          <Text>Azoxystrobin en Dosis: 0.4-0.5 L/Ha. 
                          {'/n'}Azufre Elemental en Dosis: 200 - 400 g/100 L de agua. 
                          {'/n'}Boscalid + Pyraclostrobin en Dosis: 0.8 kg/ha. 
                          {'/n'}Cyprodinil + Fludioxonil en Dosis: 0.8 - 1.0 kg/ha. 
                          {'/n'}Folpet en Dosis: 150 - 200 gr / 100L. 
                          {'/n'}Hidróxido Cúprico en Dosis: 300 a 400 g/100 lt. de agua. 
                          {'/n'}Hidróxido de cobre en Dosis: 300 a 400 g/100 lt. de agua.</Text>
                        </View>
                      )}
                    </View>

                    <View style={{marginBottom:50}}></View>

                  </ResultContextProvider>

                  {/* Botón para guardar diagnóstico */}
                  <View style={styles.Container}>
                    {!vista &&(
                    <Button title="Terminar" onPress={Limpiar} color={COLORS.dark2} />
                    )}
                  </View>

                </View>
              )}
              </View>

              <View style={styles.Container && {marginBottom:10}}>
                {vista &&(
                  <Button title="Regresar" onPress={regresar} color={COLORS.green} />
                )}
              </View>

              <View style={styles.Container}>
                {vista &&(
                  <Button title="Guardar diagnostico" onPress={saveDiagnosis} color={COLORS.dark2} />
                )}
              </View>

              <View style={{marginBottom:50}}></View>
            </ScrollView>
          </View>

        </View>
    </SafeAreaView>
  )
}

export default GravedadScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "white",
  },
  ContainerBackground: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "#D2D2D2",
    borderRadius: 12,
    marginTop:10,
  },
  textAlt: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
     marginLeft: 10, 
     marginBottom: 16, 
     marginTop: 24,
     color: COLORS.gray3,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  innerContainer: {
    backgroundColor: 'lightblue',
    padding: 20,
    borderRadius: 10,
  },
})