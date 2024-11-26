import { View, Text, SafeAreaView, StyleSheet, ScrollView, Button, Alert, TouchableOpacity, Modal, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import CheckBox from 'react-native-check-box';
import Botton from '../../../src/components/Botton';
import COLORS from '../../Constants/Color';

const AllDiagnostics = ({navigation}) => {  
  //opciones areas
  const [Fruto, setFruto] = useState(false);
  const [Hoja, setHoja] = useState(false);
  const [Tronco, setTronco] = useState(false);
  const [Flor, setFlor] = useState(false);
  
  //opciones fruto
  const [MediaLunaFruto, setMediaLunaFruto] = useState(false);
  const [SudoracionFruto, setSudoracionFruto] = useState(false);
  const [PerfoFruto, setPerfoFruto] = useState(false);
  const [LarvasFruto, setLarvasFruto] = useState(false);
  const [AbortoFruto, setAbortoFruto] = useState(false);
  const [SeBlFruto, setSeBlFruto] = useState(false);
  const [ManBlFruto, setManBlFruto] = useState(false);
  const [ResiPerfoFruto, setResiPerfoFruto] = useState(false);
  const [ProtuberanciasFruto, setProtuberanciasFruto] = useState(false);
  const [DeformacionFruto, setDeformacionFruto] = useState(false);
  const [RugosidadFruto, setRugosidadFruto] = useState(false);
  const [ColorRojizoFruto, setColorRojizoFruto] = useState(false);
  const [RoenFruto, setRoenFruto] = useState(false);
  const [GusanoVerAmaFruto, setGusanoVerAmaFruto] = useState(false);
  const [TelaranasFruto, setTelaranasFruto] = useState(false);
  const [EscarabajoFruto, setEscarabajoFruto] = useState(false);
  const [HormiguerosFruto, setHormiguerosFruto] = useState(false);
  const [MuerteFruto, setMuerteFruto] = useState(false);
  const [DisProFruto, setDisProFruto] = useState(false);
  const [RecubriNegPolvFruto, setRecubriNegPolvFruto] = useState(false);
  const [ManOscFruto, setManOscFruto] = useState(false);
  const [LesionesFruto, setLesionesFruto] = useState(false);
  const [MarchitezFruto, setMarchitezFruto] = useState(false);
  const [ColorAmariFruto, setColorAmariFruto] = useState(false);
  const [PedunculoFruto, setPedunculoFruto] = useState(false);
  const [DecoloracionFruto, setDecoloracionFruto] = useState(false);

  //opciones hoja
  const [DefolicionHoja, setDefolicionHoja] = useState(false);
  const [DecoloracionHoja, setDecoloracionHoja] = useState(false);
  const [QuebradizaHoja, setQuebradizaHoja] = useState(false);
  const [DeformacionHoja, setDeformacionHoja] = useState(false);
  const [ColRojizoHoja, setColRojizoHoja] = useState(false);
  const [TelaranasHoja, setTelaranasHoja] = useState(false);
  const [RoenHoja, setRoenHoja] = useState(false);
  const [GusAmaVerHoja, setGusAmaVerHoja] = useState(false);
  const [PunColVerOscHoja, setPunColVerOscHoja] = useState(false);
  const [EscarabajoHoja, setEscarabajoHoja] = useState(false);
  const [MarchitezHoja, setMarchitezHoja] = useState(false);
  const [RecNegPolHoja, setRecNegPolHoja] = useState(false);
  const [ManchasHoja, setManchasHoja] = useState(false);
  const [RetorcimientoHojas, setRetorcimientoHojas] = useState(false);
  const [ColAmarillentoHoja, setColAmarillentoHoja] = useState(false);

  //opciones tronco
  const [PerfoTronco, setPerfoTronco] = useState(false);
  const [ResPerfoTronco, setResPerfoTronco] = useState(false);
  const [RamasSecasTronco, setRamasSecasTronco] = useState(false);
  const [ColRojizoTronco, setColRojizoTronco] = useState(false);
  const [EscarabajoTronco, setEscarabajoTronco] = useState(false);
  const [TubosCorAserrin, setTubosCorAserrin] = useState(false);
  const [UlcerasTronco, setUlcerasTronco] = useState(false);
  const [SecBlancaTronco, setSecBlancaTronco] = useState(false);
  const [LesionesTronco, setLesionesTronco] = useState(false);
  const [MuerteTronco, setMuerteTronco] = useState(false);
  const [CresLentoTronco, setCresLentoTronco] = useState(false);
  const [RecNegPolTronco, setRecNegPolTronco] = useState(false);
  const [DescIntTronco, setDescIntTronco] = useState(false);
  const [HormiguerosTronco, setHormiguerosTronco] = useState(false);
  const [LarvaTronco, setLarvaTronco] = useState(false);

  //opciones flor
  const [AbortoFlor, setAbortoFlor] = useState(false);
  const [DeformacionFlor, setDeformacionFlor] = useState(false);
  const [ColRojizoFlor, setColRojizoFlor] = useState(false);
  const [MuerteFlor, setMuerteFlor] = useState(false);
  const [HormiguerosFlor, setHormiguerosFlor] = useState(false); 

  const [results, setResults] = useState<string[]>([]);

  useEffect (()=>{ 
    setResults ([])
   }, [
    HormiguerosFlor,MuerteFlor,ColRojizoFlor,DeformacionFlor,AbortoFlor,LarvaTronco,HormiguerosTronco,DescIntTronco,RecNegPolTronco,CresLentoTronco,MuerteTronco,
    LesionesTronco,SecBlancaTronco,MediaLunaFruto,SudoracionFruto,PerfoFruto,LarvasFruto,AbortoFruto,SeBlFruto,ManBlFruto,ResiPerfoFruto,ProtuberanciasFruto,
    DeformacionFruto,RugosidadFruto,ColorRojizoFruto,RoenFruto,GusanoVerAmaFruto,TelaranasFruto,EscarabajoFruto,HormiguerosFruto,MuerteFruto,DisProFruto,
    RecubriNegPolvFruto,ManOscFruto,LesionesFruto,MarchitezFruto,ColorAmariFruto,PedunculoFruto,DecoloracionFruto,DefolicionHoja,DecoloracionHoja,QuebradizaHoja,
    DeformacionHoja,ColRojizoHoja,TelaranasHoja,RoenHoja,GusAmaVerHoja,PunColVerOscHoja,EscarabajoHoja,MarchitezHoja,RecNegPolHoja,ManchasHoja,RetorcimientoHojas,
    ColAmarillentoHoja,PerfoTronco,ResPerfoTronco,RamasSecasTronco,ColRojizoTronco,EscarabajoTronco,TubosCorAserrin,UlcerasTronco
   ])

  const validate = (): string[] => {
    const result: string[] = [];
  
    if (MediaLunaFruto && SudoracionFruto && PerfoFruto && LarvasFruto) {
      result.push("Barrenador de pequeño hueso del aguacate");
    }
    if (AbortoFruto && DefolicionHoja && PerfoTronco && ResPerfoTronco && RamasSecasTronco && AbortoFlor) {
      result.push("Barrenador de tronco y ramas del aguacate");
    }
    if (PerfoFruto && SeBlFruto && AbortoFruto) {
      result.push("Barrenador grande de la semilla del Aguacate");
    }
    if (ManBlFruto && PerfoFruto && ResiPerfoFruto && PerfoTronco && ResPerfoTronco) {
      result.push("Palomilla barrenadora del aguacate (ácaro)");
    }
    if (ProtuberanciasFruto && DeformacionFruto && RugosidadFruto && DecoloracionHoja && QuebradizaHoja && AbortoFlor) {
      result.push("Trips");
    }
    if (ColorRojizoFruto && DeformacionFruto && DeformacionHoja && ColRojizoHoja && TelaranasHoja && ColRojizoTronco && DeformacionFlor && ColRojizoFlor) {
      result.push("Araña roja");
    }
    if (RoenFruto && GusanoVerAmaFruto && TelaranasFruto && RoenHoja && GusAmaVerHoja && TelaranasHoja) {
      result.push("Gusano telarañero o enrollador de hoja");
    }
    if (DeformacionFruto && TelaranasFruto && DecoloracionHoja && PunColVerOscHoja && DefolicionHoja && TelaranasHoja) {
      result.push("Araña blanca, cristalina o telarañera");
    }
    if (EscarabajoFruto && EscarabajoHoja && MarchitezHoja && EscarabajoTronco && PerfoTronco && TubosCorAserrin) {
      result.push("Ambrosiales");
    }
    if (DeformacionFruto && AbortoFruto && PerfoFruto) {
      result.push("Mosca ovario");
    }
    if (HormiguerosFruto && RoenHoja && HormiguerosTronco && HormiguerosFlor) {
      result.push("Hormigas atta");
    }
    if (EscarabajoFruto && ColAmarillentoHoja && EscarabajoTronco && LarvaTronco) {
      result.push("Gallina ciega");
    }
    if (ManOscFruto && RugosidadFruto && DecoloracionFruto) {
      result.push("Roña");
    }
    if (UlcerasTronco && SecBlancaTronco) {
      result.push("Cáncer o cancro");
    }
    if (MuerteFruto && DisProFruto && MarchitezHoja && LesionesTronco && MuerteTronco && CresLentoTronco && MuerteFlor) {
      result.push("Tristeza del aguacatero");
    }
    if (MuerteFruto && DisProFruto && MarchitezHoja && DescIntTronco) {
      result.push("Pudrición del cuello y raíz");
    }
    if (RecubriNegPolvFruto && RecNegPolHoja && RecNegPolTronco) {
      result.push("Fumagina");
    }
    if (ManOscFruto && LesionesFruto && MarchitezFruto && MarchitezHoja) {
      result.push("Antracnosis");
    }
    if (DecoloracionFruto && LesionesFruto && MarchitezFruto && MarchitezHoja) {
      result.push("Viroide")
    }
    if (PedunculoFruto && MuerteFruto && DisProFruto) {
      result.push("Anillamiento de pedúnculo")
    }
  
    return result;
  }
  
  const handleResultsNavigation = () => {
    const result = validate()
    if (result.length > 0) {
      setResults(result);
      Alert.alert("Se encontraron coincidencias");
    } else {
      Alert.alert("No se encontraron coincidencias");
    }
  };

  

  const limpiar = () => {
  //opciones areas
  setFruto(false); setHoja(false); setTronco(false); setFlor(false);
  //opciones fruto
  setMediaLunaFruto(false), setSudoracionFruto(false); setPerfoFruto(false); setLarvasFruto(false); setAbortoFruto(false); setSeBlFruto(false); setManBlFruto(false);
  setResiPerfoFruto(false); setProtuberanciasFruto(false); setDeformacionFruto(false); setRugosidadFruto(false); setColorRojizoFruto(false); setRoenFruto(false); setGusanoVerAmaFruto(false);
  setTelaranasFruto(false); setEscarabajoFruto(false); setHormiguerosFruto(false); setMuerteFruto(false); setDisProFruto(false); setRecubriNegPolvFruto(false);
  setManOscFruto(false); setLesionesFruto(false); setMarchitezFruto(false); setColorAmariFruto(false); setPedunculoFruto(false); setDecoloracionFruto(false);
  //opciones hoja
  setDefolicionHoja(false); setDecoloracionHoja(false); setQuebradizaHoja(false); setDeformacionHoja(false); setColRojizoHoja(false); setTelaranasHoja(false);
  setRoenHoja(false); setGusAmaVerHoja(false); setPunColVerOscHoja(false); setEscarabajoHoja(false); setMarchitezHoja(false); setRecNegPolHoja(false);
  setManchasHoja(false); setRetorcimientoHojas(false); setColAmarillentoHoja(false);
  //opciones tronco
  setPerfoTronco(false); setResPerfoTronco(false); setRamasSecasTronco(false); setColRojizoTronco(false); setEscarabajoTronco(false); setTubosCorAserrin(false);
  setUlcerasTronco(false); setSecBlancaTronco(false); setLesionesTronco(false); setMuerteTronco(false); setCresLentoTronco(false); setRecNegPolTronco(false);
  setDescIntTronco(false); setHormiguerosTronco(false); setLarvaTronco(false);
  //opciones flor
  setAbortoFlor(false); setDeformacionFlor(false); setColRojizoFlor(false); setMuerteFlor(false); setHormiguerosFlor(false); 
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const showImageReference = (imageSource) => {
    setCurrentImage(imageSource); // Cambia la imagen según el checkbox
    setModalVisible(true); // Muestra el modal
  };
  
  return (
    
    <SafeAreaView style={styles.Container}>
      <View style={{ marginHorizontal: 22, justifyContent: "space-between"}}>        
        <View style={{ marginTop: 50}}>
          <Text style={{fontSize: 18, fontFamily:"Poppins_500Medium"}}>Seleccione la opción a modificar</Text>
          <View style={styles.checkboxContainer}>
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={() => setFruto(!Fruto)}
              isChecked={Fruto}
              rightText={"Fruto"}
            />
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={() => setHoja(!Hoja)}
              isChecked={Hoja}
              rightText={"Hoja"}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={() => setTronco(!Tronco)}
              isChecked={Tronco}
              rightText={"Tronco"}
            />
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={() => setFlor(!Flor)}
              isChecked={Flor}
              rightText={"Flor"}
            />
          </View>
          <Text style={{fontSize: 12, fontFamily:"Poppins_500Medium"}}>Deje precionado el sintoma para una imagen de referencia</Text>
        </View>
      </View>
        <View style={{flex: 1, marginHorizontal: 22, marginVertical:10, justifyContent: "space-between"}}>
          <View>

            <ScrollView scrollEventThrottle={1}>
              <View style={styles.Container}>

                <View style={styles.ContainerBackground }>
                  {Fruto &&  (
                    <View style={{ marginTop: 10}}> 
                      <Text style={{fontSize: 18, fontFamily:"Poppins_500Medium"}}>   Fruto</Text> 

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{ flex: 1, padding: 10 }}
                          onClick={() => setMediaLunaFruto(!MediaLunaFruto)}
                          isChecked={MediaLunaFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Lesiones en forma de medialuna/MediaLuna.jpg"))}>
                              <Text >Lesiones en forma</Text>
                              <Text >de media luna</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{ flex: 1, padding: 10 }}
                          onClick={() => setSudoracionFruto(!SudoracionFruto)}
                          isChecked={SudoracionFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Perforaciones/perforaciones.jpg"))}>
                              <Text >Sudoración</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setPerfoFruto(!PerfoFruto)}
                          isChecked={PerfoFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Perforaciones/perforaciones.jpg"))}>
                              <Text >Perforaciones</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setAbortoFruto(!AbortoFruto)}
                          isChecked={AbortoFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Aborto/Aborto.jpg"))}>
                              <Text >Aborto</Text>
                            </TouchableOpacity>
                          }
                          
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setSeBlFruto(!SeBlFruto)}
                          isChecked={SeBlFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Secreción blanca/SecrecionBlanca.jpg"))}>
                              <Text >Secreción blanca</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setManBlFruto(!ManBlFruto)}
                          isChecked={ManBlFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Secreción blanca/ManchasBlancas.jpg"))}>
                              <Text >Manchas blancas</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setResiPerfoFruto(!ResiPerfoFruto)}
                          isChecked={ResiPerfoFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Residuos en perforaciones/Residuos.jpg"))}>
                              <Text >Residuos en</Text>
                              <Text >Perforaciones</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setProtuberanciasFruto(!ProtuberanciasFruto)}
                          isChecked={ProtuberanciasFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Protuberancia, Laceración/protuberancia.jpg"))}>
                              <Text >Protuberancias</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setDeformacionFruto(!DeformacionFruto)}
                          isChecked={DeformacionFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Deformación/Deformación.jpg"))}>
                              <Text >Deformación</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setRugosidadFruto(!RugosidadFruto)}
                          isChecked={RugosidadFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Rugosidad/Rugosidad.jpg"))}>
                              <Text >Rugosidad</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setColorRojizoFruto(!ColorRojizoFruto)}
                          isChecked={ColorRojizoFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Color Rojizo/ColorRojizo.jpg"))}>
                              <Text >Color Rojizo</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setRoenFruto(!RoenFruto)}
                          isChecked={RoenFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Roen (Consumida)/Roen.jpg"))}>
                              <Text >Roen (Consumida)</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setGusanoVerAmaFruto(!GusanoVerAmaFruto)}
                          isChecked={GusanoVerAmaFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Gusano Amarillo-Verde/GusanoAmarillo-Verde.jpg"))}>
                              <Text >Gusano Amarillo /</Text>
                              <Text >Verde</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setTelaranasFruto(!TelaranasFruto)}
                          isChecked={TelaranasFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Telarañas/Telarañas.jpg"))}>
                              <Text >Telarañas</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setHormiguerosFruto(!HormiguerosFruto)}
                          isChecked={HormiguerosFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Hormigueros/Hormigueros.jpg"))}>
                              <Text >Presencia de</Text>
                              <Text >hormigas</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setEscarabajoFruto(!EscarabajoFruto)}
                          isChecked={EscarabajoFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Escarabajo/Escarabajo.jpg"))}>
                              <Text >Escarabajo</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setManOscFruto(!ManOscFruto)}
                          isChecked={ManOscFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Manchas Oscuras/Manchas Oscuras.jpg"))}>
                              <Text >Manchas Oscuras</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setDisProFruto(!DisProFruto)}
                          isChecked={DisProFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Muerte y disminución de la producción/Disminución de producción.jpg"))}>
                              <Text >Disminución de</Text>
                              <Text >producción</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setMuerteFruto(!MuerteFruto)}
                          isChecked={MuerteFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Muerte y disminución de la producción/Muerte.jpg"))}>
                              <Text >Muerte</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setRecubriNegPolvFruto(!RecubriNegPolvFruto)}
                          isChecked={RecubriNegPolvFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Recubrimiento negro y polvoriento/Recubrimiento negro y polvoriento.jpg"))}>
                              <Text >Recubrimiento negro</Text>
                              <Text >y polvoriento</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setLesionesFruto(!LesionesFruto)}
                          isChecked={LesionesFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Lesiones/Lesiones.jpg"))}>
                              <Text >Lesiones</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setMarchitezFruto(!MarchitezFruto)}
                          isChecked={MarchitezFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Marchitez/Marchitez.jpg"))}>
                              <Text >Marchitez</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setColorAmariFruto(!ColorAmariFruto)}
                          isChecked={ColorAmariFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Color amarillento/Color amarillento.jpg"))}>
                              <Text >Color amarillento</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setPedunculoFruto(!PedunculoFruto)}
                          isChecked={PedunculoFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Daño en pedúnculo/Daño en pedúnculo.jpg"))}>
                              <Text >Daño en pedúnculo</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setLarvasFruto(!LarvasFruto)}
                          isChecked={LarvasFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Larvas/Larvas.jpg"))}>
                              <Text >Larvas</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setDecoloracionFruto(!DecoloracionFruto)}
                          isChecked={DecoloracionFruto}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Fruto/Decoloración/Decoloracion.jpg"))}>
                              <Text >Decoloración</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                    </View>
                  )}
                </View>

                <View style={styles.ContainerBackground }>
                  {Hoja && (

                    <View style={{ marginTop: 10}}> 
                      <Text style={{fontSize: 18, fontFamily:"Poppins_500Medium"}}>   Hoja</Text> 

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setDefolicionHoja(!DefolicionHoja)}
                          isChecked={DefolicionHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Defoliación , marchiez y quebadizas/Defoliación.jpg"))}>
                              <Text >Defoliación</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setDecoloracionHoja(!DecoloracionHoja)}
                          isChecked={DecoloracionHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Decoloración y puntos/puntos.jpg"))}>
                              <Text >Decoloración</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setQuebradizaHoja(!QuebradizaHoja)}
                          isChecked={QuebradizaHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Defoliación , marchiez y quebadizas/Quebradizas.jpg"))}>
                              <Text >Quebradizas</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setDeformacionHoja(!DeformacionHoja)}
                          isChecked={DeformacionHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/roen y deformación/Deformación.jpg"))}>
                              <Text >Deformación</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setColRojizoHoja(!ColRojizoHoja)}
                          isChecked={ColRojizoHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Color rojizo/Color rojizo.jpg"))}>
                              <Text >Color rojizo</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setTelaranasHoja(!TelaranasHoja)}
                          isChecked={TelaranasHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Telarañas/Telarañas.jpg"))}>
                              <Text >Telarañas</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setRoenHoja(!RoenHoja)}
                          isChecked={RoenHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/roen y deformación/Roen.jpg"))}>
                              <Text >Roen (Consumida)</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setGusAmaVerHoja(!GusAmaVerHoja)}
                          isChecked={GusAmaVerHoja}

                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Gusano Amarillo-Verde/GusanoAmarillo-Verde.jpg"))}>
                              <Text >Gusano Amarillo /</Text>
                              <Text >Verde</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setPunColVerOscHoja(!PunColVerOscHoja)}
                          isChecked={PunColVerOscHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Decoloración y puntos/puntos.jpg"))}>
                              <Text >Puntos de color</Text>
                              <Text >verde claro a</Text>
                              <Text >oscuro</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setEscarabajoHoja(!EscarabajoHoja)}
                          isChecked={EscarabajoHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/escarabajo/escarabajo.jpg"))}>
                              <Text >Presencia</Text>
                              <Text >escarabajo</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setMarchitezHoja(!MarchitezHoja)}
                          isChecked={MarchitezHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Defoliación , marchiez y quebadizas/Marchitez.jpg"))}>
                              <Text >Marchitez</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setRecNegPolHoja(!RecNegPolHoja)}
                          isChecked={RecNegPolHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Recubrimiento/Recubrimiento.jpg"))}>
                              <Text >Recubrimiento negro</Text>
                              <Text >y polvoriento</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setRetorcimientoHojas(!RetorcimientoHojas)}
                          isChecked={RetorcimientoHojas}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Retorcimiento/Retorcimiento.jpg"))}>
                              <Text >Retorcimiento</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setManchasHoja(!ManchasHoja)}
                          isChecked={ManchasHoja}
                          rightText={"Manchas"}
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setColAmarillentoHoja(!ColAmarillentoHoja)}
                          isChecked={ColAmarillentoHoja}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Color amarillento/ColorAmarillento.png"))}>
                              <Text >Color amarillento</Text>
                            </TouchableOpacity>
                          }
                        />
                        
                      </View>

                    </View>
                  
                  )}
                </View>

                <View style={styles.ContainerBackground}>
                  {Tronco && (
                    <View style={{ marginTop: 10}}> 
                      <Text style={{fontSize: 18, fontFamily:"Poppins_500Medium"}}>   Tronco</Text> 

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setPerfoTronco(!PerfoTronco)}
                          isChecked={PerfoTronco}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Perforaciones y residuos/Perforaciones.jpg"))}>
                              <Text >Perforaciones</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setResPerfoTronco(!ResPerfoTronco)}
                          isChecked={ResPerfoTronco}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Perforaciones y residuos/residuos.jpg"))}>
                              <Text >Residuos en</Text>
                              <Text >perforaciones</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setRamasSecasTronco(!RamasSecasTronco)}
                          isChecked={RamasSecasTronco}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Ramas secas/Ramas secas.jpg"))}>
                              <Text >Ramas secas</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setColRojizoTronco(!ColRojizoTronco)}
                          isChecked={ColRojizoTronco}
                          rightText={"Color rojizo"}
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setEscarabajoTronco(!EscarabajoTronco)}
                          isChecked={EscarabajoTronco}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Presencia escarabajo/escarabajo.jpg"))}>
                              <Text >Presencia</Text>
                              <Text >escarabajo</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setLarvaTronco(!LarvaTronco)}
                          isChecked={LarvaTronco}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Larva en raiz/Larva.jpg"))}>
                              <Text >Presencia de larva</Text>
                              <Text >en parte inicial</Text>
                              <Text >del tronco y raíz</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setTubosCorAserrin(!TubosCorAserrin)}
                          isChecked={TubosCorAserrin}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Tubos cortos de aserrín/tubos.jpg"))}>
                              <Text >Tubos cortos</Text>
                              <Text >de aserrín</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setUlcerasTronco(!UlcerasTronco)}
                          isChecked={UlcerasTronco}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Ulceras color oscuro/ulceras.jpg"))}>
                              <Text >Ulceras color</Text>
                              <Text >oscuro</Text>
                              <Text >(marrón Negro)</Text>
                            </TouchableOpacity>
                          }
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setSecBlancaTronco(!SecBlancaTronco)}
                          isChecked={SecBlancaTronco}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Secreción blanca/SecreciónBlanca.jpg"))}>
                              <Text >Secreción blanca</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setLesionesTronco(!LesionesTronco)}
                          isChecked={LesionesTronco}
                          rightText={"Lesiones"}
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setMuerteTronco(!MuerteTronco)}
                          isChecked={MuerteTronco}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Muerte/Muerte.jpg"))}>
                              <Text >Muerte</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setCresLentoTronco(!CresLentoTronco)}
                          isChecked={CresLentoTronco}
                          rightText={"Crecimiento Lento"}
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setDescIntTronco(!DescIntTronco)}
                          isChecked={DescIntTronco}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Descomposición inferior/Descomposición.jpg"))}>
                              <Text >Descomposición</Text>
                              <Text >inferior del</Text>
                              <Text >tronco</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setRecNegPolTronco(!RecNegPolTronco)}
                          isChecked={RecNegPolTronco}
                          rightText={"Recubrimiento negro y polvoriento"}
                          
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setHormiguerosTronco(!HormiguerosTronco)}
                          isChecked={HormiguerosTronco}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Tallo  Tronco/Presencia de hormigas/hormigas.jpg"))}>
                              <Text >Presencia de</Text>
                              <Text >hormigas</Text>
                            </TouchableOpacity>
                          }
                        />
                        
                      </View>

                    </View>    
                  )}
                </View>

                <View style={styles.ContainerBackground}>
                  {Flor && (

                    <View style={{ marginTop: 10}}> 
                      <Text style={{fontSize: 18, fontFamily:"Poppins_500Medium"}}>   Flor</Text> 

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setAbortoFlor(!AbortoFlor)}
                          isChecked={AbortoFlor}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Flor/Aborto/Aborto.jpg"))}>
                              <Text >Aborto</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setDeformacionFlor(!DeformacionFlor)}
                          isChecked={DeformacionFlor}
                          rightText={"Deformación"}
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setColRojizoFlor(!ColRojizoFlor)}
                          isChecked={ColRojizoFlor}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Hoja/Telarañas/Rojizo.jpg"))}>
                              <Text >Color rojizo</Text>
                            </TouchableOpacity>
                          }
                        />
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setMuerteFlor(!MuerteFlor)}
                          isChecked={MuerteFlor}
                          rightText={"Muerte"}
                        />
                      </View>

                      <View style={styles.checkboxContainer}>
                        <CheckBox
                          style={{flex: 1, padding: 10}}
                          onClick={() => setHormiguerosFlor(!HormiguerosFlor)}
                          isChecked={HormiguerosFlor}
                          rightText={
                            <TouchableOpacity onLongPress={() => showImageReference(require("../../../src/assets/images/Imagenes SE/Flor/Presencia de hormigas/hormigas.jpg"))}>
                              <Text >Presencia de hormigas</Text>
                            </TouchableOpacity>
                          }
                        />
                        
                      </View>

                    </View>
                  
                  )}
                </View>

                <Modal
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)} // Cierra el modal si se presiona "atrás"
                >
                  <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)} // Cierra el modal al hacer clic fuera de la imagen
                  >
                    <View style={styles.modalContent}>
                      {currentImage && (
                        <Image
                          source={currentImage}
                          style={styles.modalImage} // Imagen a pantalla completa o ajustada
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </Modal>

                {results.length > 0 && results.map((diagnosisName, index) => (
                  <View key={index} style={{ marginTop: 10, borderRadius: 20 }}>
                    <Button
                      title={diagnosisName}
                      color={COLORS.dark}
                      onPress={() => navigation.navigate('GravedadScreen', { diagnosisData: { name: diagnosisName } })}
                    />
                  </View>
                ))}

                <View style={{ marginTop: 10, borderRadius: 20}}>
                  <Button title="Analizar" color= {COLORS.green} onPress={handleResultsNavigation}/>
                </View>

                <View style={{ marginTop: 10, borderRadius: 20}}>
                  <Button title="Limpiar" color= {COLORS.dark2} onPress={limpiar}/>
                </View>

                
              </View>
            </ScrollView>
          </View>

        </View>
    </SafeAreaView>
  )
}

export default AllDiagnostics;

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
  rightText: {
    color: '#000', // Cambia el color según tu diseño
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: '90%', // Ajustar el tamaño del modal según tu preferencia
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
})