import { StyleSheet, Text, View, Image, Dimensions, Alert, FlatList, TouchableOpacity } from 'react-native'
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

const OfflineImagesScreen = ({ navigation, route }) => {
  const [offlineImages, setOfflineImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const loadOfflineImages = async () => {
      try {
        const storedImagesJson = await AsyncStorage.getItem('offlineImageUris');
        if (storedImagesJson) {
          const storedImages = JSON.parse(storedImagesJson);
          
          // Load image previews
          const imagePromises = storedImages.map(async (uri) => {
            const base64 = await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64
            });
            return {
              uri: uri,
              base64: base64,
              preview: `data:image/jpeg;base64,${base64}`
            };
          });

          const loadedImages = await Promise.all(imagePromises);
          setOfflineImages(loadedImages);
        }
      } catch (error) {
        console.error('Error loading offline images', error);
      }
    };

    loadOfflineImages();
  }, []);

  const toggleImageSelection = (image) => {
    setSelectedImages(current => 
      current.includes(image) 
        ? current.filter(img => img !== image)
        : [...current, image]
    );
  };

  const processSelectedImages = async () => {
    try {
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        Alert.alert('Sin conexión', 'Necesita conexión a internet para procesar las imágenes.');
        return;
      }

      // Process images sequentially
      for (const image of selectedImages) {
        try {
          // Upload image
          const response = await fetch(cameraIP, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: image.base64 }),
          });
          
          const data = await response.json();
          
          if (data.plagas_detectadas && data.plagas_detectadas.length > 0 && data.plagas_detectadas[0].length > 0) {
            // Navigate to results
            navigation.navigate("DetectionResults", { resultados: data });
            
            // Remove processed image from storage
            const storedImagesJson = await AsyncStorage.getItem('offlineImageUris');
            const storedImages = JSON.parse(storedImagesJson);
            const updatedImages = storedImages.filter(uri => uri !== image.uri);
            
            if (updatedImages.length > 0) {
              await AsyncStorage.setItem('offlineImageUris', JSON.stringify(updatedImages));
            } else {
              await AsyncStorage.removeItem('offlineImageUris');
            }

            // Delete the image file
            await FileSystem.deleteAsync(image.uri);

            // Remove from local state
            setOfflineImages(current => current.filter(img => img !== image));
            setSelectedImages(current => current.filter(img => img !== image));
          } else {
            Alert.alert(
              'No se identificó un aguacate',
              'Esta imagen no pudo ser procesada.',
              [{ text: 'OK' }]
            );
          }
        } catch (uploadError) {
          console.error('Error processing image', uploadError);
        }
      }
    } catch (error) {
      console.error('Error in batch processing', error);
    }
  };

  const renderOfflineImage = ({ item }) => (
    <TouchableOpacity 
      onPress={() => toggleImageSelection(item)}
      style={[
        styles.imageContainer,
        selectedImages.includes(item) && styles.selectedImage
      ]}
    >
      <Image 
        source={{ uri: item.preview }} 
        style={styles.offlineImage} 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imágenes sin conexión</Text>
      
      {offlineImages.length === 0 ? (
        <Text style={styles.emptyState}>No hay imágenes almacenadas</Text>
      ) : (
        <>
          <FlatList
            data={offlineImages}
            renderItem={renderOfflineImage}
            keyExtractor={(item) => item.uri}
            numColumns={3}
            ListFooterComponent={
              selectedImages.length > 0 && (
                <Botton 
                  title={`Procesar ${selectedImages.length} imagen(es)`} 
                  filled 
                  onPress={processSelectedImages}
                  style={styles.processButton}
                />
              )
            }
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    textAlign: 'center',
    marginVertical: 10,
  },
  emptyState: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.gray,
  },
  imageContainer: {
    flex: 1,
    margin: 2,
    aspectRatio: 1,
  },
  offlineImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: COLORS.green,
  },
  processButton: {
    marginTop: 20,
    marginHorizontal: 20,
  }
});

export default OfflineImagesScreen;