import { StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import {Camera, CameraView, CameraType, FlashMode} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React from 'react';
import IcoBottonTL from '../../../src/components/IcoBottonTL';
import * as ExpoImagePicker  from "expo-image-picker";
import Botton from '../../../src/components/Botton';
import COLORS from '../../Constants/Color';
import LottieView from 'lottie-react-native';
import { cameraIP } from '../../../src/servises/constantes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import * as FileSystem from 'expo-file-system'; 


const CameraScreen = ({navigation}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const cameraRef = useRef(null);
  const [resultados, setResultados] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  // New function to store large images
  const storeImageOffline = async (base64Image) => {
    try {
      // Generate a unique filename
      const filename = `offline_image_${Date.now()}.jpg`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      // Write the base64 image to a file
      await FileSystem.writeAsStringAsync(fileUri, base64Image, {
        encoding: FileSystem.EncodingType.Base64
      });

      // Store the file URI in AsyncStorage
      const storedImagesJson = await AsyncStorage.getItem('offlineImageUris');
      const storedImages = storedImagesJson ? JSON.parse(storedImagesJson) : [];
      
      await AsyncStorage.setItem('offlineImageUris', JSON.stringify([
        ...storedImages, 
        fileUri
      ]));

      return true;
    } catch (error) {
      console.error('Error storing image offline:', error);
      return false;
    }
  };

  // Modified uploadImage function
  const uploadImage = async (base64, navigation) => {
    try {
      // Check internet connection before uploading
      const netState = await NetInfo.fetch();
      
      if (!netState.isConnected) {
        // Store image for later processing
        const success = await storeImageOffline(base64);
        if (success) {
          Alert.alert(
            'Sin conexión',
            'La imagen se almacenó para procesar cuando haya internet.',
            [{ text: 'OK' }]
          );
        }
        return;
      }
      setLoading(true);
      let response = await fetch(cameraIP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }),
      });
      
      const data = await response.json();
      setLoading(false);
      
      if (data.plagas_detectadas && data.plagas_detectadas.length > 0 && data.plagas_detectadas[0].length > 0) {
        setResultados(data);
        navigation.navigate("DetectionResults", { resultados: data });
      } else {
        Alert.alert(
          'No se identificó un aguacate',
          'Por favor, intente tomar otra foto.',
          [{ text: 'OK' }]
        );
      }

    } catch (error) {
      console.log('Hubo un error al subir la imagen', error);
      setLoading(false);
    }
  };
  
  
  
  if (hasCameraPermission === false){
    return <Text>Sin acceso a la camara</Text>
  }
  
  function toggleFlash () {
    setFlash(current => (current === "off" ? "on" : "off"));
  }

  function toggleCamera () {
    setType(current => (current === "back" ? "front" : "back"));
  }

  const checkOfflineImages = async () => {
    try {
      // Retrieve stored image URIs
      const storedImagesJson = await AsyncStorage.getItem('offlineImageUris');
      if (storedImagesJson) {
        const storedImageUris = JSON.parse(storedImagesJson);
        
        if (storedImageUris.length > 0) {
          setOfflineQueue(true);
          Alert.alert(
            'Imágenes pendientes',
            `Tienes ${storedImageUris.length} imagen(es) sin procesar.`,
            [{ 
              text: 'Ir a Imágenes Offline', 
              onPress: () => navigation.navigate('OfflineImages') 
            }]
          );
        }else{
          setOfflineQueue(false);
        }
      }
    } catch (error) {
      console.log('Error checking offline images', error);
    }
  };

  useEffect(() => {
    // checkOfflineImages();
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setIsConnected(true);
        checkOfflineImages();
      }else{
        setIsConnected(false);
      }
    });
  
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  
    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  },[]);


  const tomarFoto = async () => {
    if(cameraRef){
      try {
        const datosImg = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          quality: 0.5,
          base64: true,
        });
        setImage(datosImg.uri);
        setCapturedImage(datosImg.base64);
      } catch (error) {
        console.log('Error al cargar la imagen' + error);
      }
    }
  }

  const openImagePicker = async () => {
    try{
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await ExpoImagePicker.requestCameraPermissionsAsync();
        const imResult = await ExpoImagePicker.launchImageLibraryAsync({
          mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1,
          base64: true,
        })

        if (!imResult.canceled) {
          setImage(imResult.assets[0].uri);
          setCapturedImage(imResult.assets[0].base64);
        }
      }else{
        Alert.alert('Permiso necesario', 'Se necesita permiso para acceder a la galería de imágenes.');
        return;
      }
    }catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      {image ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "space-between" }}>
          <Image source={{ uri: image }} style={{ width: width, height: height + 50, resizeMode: "cover", borderRadius: 20, position: 'absolute' }} />

          <View style={{ position: 'absolute', flex: 1, flexDirection: "row", justifyContent: "space-between", alignContent: "center", top: 45, alignItems: 'center', width: '100%', paddingHorizontal: 20 }}>
            <Text style={{ fontFamily: "Poppins_700Bold", color: "white", fontSize: 24 }}>TlalTec</Text>
            <IcoBottonTL
              onPress={() => navigation.navigate("HomeScreen")}
              iconSource={require("../../../src/assets/icons/add.png")}
            />
          </View>

          <View style={{ position: 'absolute', bottom: 0, paddingBottom: 20, paddingTop: 20, width: '100%', alignItems: 'center', backgroundColor: "rgba(39, 39, 42, 0.6)" }}>
            <Text style={styles.textAlt}>Antes de continuar, verifique que el fruto sea visible</Text>
            <View style={styles.botones}>
              <Botton 
                title="Limpiar" 
                filled 
                onPress={() => {
                  setImage(null); // Limpiar la imagen
                  setCapturedImage(null); // Limpiar la imagen capturada
                }} 
                style={{ width: "30%", paddingVertical: 13, backgroundColor: "#628093" }} 
              />
              <Botton 
                title="Comenzar escaneo" 
                filled 
                onPress={() => uploadImage(capturedImage, navigation)} 
                style={{ width: "60%", paddingVertical: 13 }} 
              />
            </View>
          </View>

        </View>
      ) : (
        <CameraView
          style={[styles.camer, { aspectRatio: 3 / 4 }]}
          flash = {flash}
          facing= {type}
          ref={cameraRef}
        >
          <View style={styles.settings}>
            <IcoBottonTL
              onPress={toggleFlash}
              iconSource={flash === "off"
                ?
                require("../../../src/assets/icons/flash_Off.png")
                :
                require("../../../src/assets/icons/flash.png")}
            />
            <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Poppins_700Bold" }}>Enfoque un aguacate</Text>
            <IcoBottonTL
              onPress={() => navigation.navigate("HomeScreen")}
              iconSource={require("../../../src/assets/icons/add.png")}
            />
          </View>
        </CameraView>
      )}
      {!image ? (
        <View style={{ position: 'absolute', width: width / 2, height: height / 1.5 }}>
          <Image source={require("../../../src/assets/icons/scan.png")} />
        </View>
      ) : <></>}

      {!image &&  (
        <View style={{ width: "100%", position: 'absolute', paddingBottom: 70, display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: "10%" }}>
          <IcoBottonTL onPress={openImagePicker} iconSource={require("../../../src/assets/icons/selecImage.png")} />
          <IcoBottonTL onPress={tomarFoto} iconSource={require("../../../src/assets/icons/Camera.png")} iconSize={70} />
          { isConnected && offlineQueue && (
            <IcoBottonTL onPress={() => navigation.navigate("OfflineImages")} iconSource={require("../../../src/assets/icons/danger1.png")}/>
          )}
          <IcoBottonTL onPress={() => toggleCamera()} iconSource={require("../../../src/assets/icons/reverse.png")} iconSize={40}/>
        </View>
      )}

      {loading && (
        <View style={styles.loadingOverlay}>
          <LottieView source={require('../../../src/assets/animations/eqewqwe.json')} style={{width: 400, height: 400}} autoPlay loop />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  camer: {
    flex: 1,
    borderRadius: 100,
  },
  icon: {
    width: 34,
    height: 34,
  },
  settings: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 150,
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  showImage: {

  },
  botones: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "90%",
    gap: 10,
    marginBottom: 50,
  },
  textAlt: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    marginBottom: 32,
    color: COLORS.gray2
  },
  loadingOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: "contain"
  },
});


export default CameraScreen


