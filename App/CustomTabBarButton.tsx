import React, { useRef } from 'react';
import { TouchableOpacity, Animated, View, StyleSheet } from 'react-native';
import COLORS from './Constants/Color'; // Tu archivo de colores

const CustomTabBarButton = ({ children, onPress }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Animación al presionar el botón
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.15,  // Incrementa el tamaño del FAB al presionarlo
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  // Animación al soltar el botón
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,  // Vuelve al tamaño original
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9} // Controla la opacidad cuando se toca
      onPressIn={handlePressIn} // Inicia la animación al tocar
      onPressOut={handlePressOut} // Termina la animación al soltar
      onPress={onPress} // Acción del botón
      style={styles.fabContainer}
    >
      <Animated.View style={[styles.fabButton, { transform: [{ scale: scaleValue }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    top: -30,  // Eleva el FAB sobre la barra de navegación
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabButton: {
    width: 70,
    height: 70,
    borderRadius: 35,  // Bordes redondeados para crear el círculo
    backgroundColor: COLORS.green,  // El color principal del FAB (ajustado a tu paleta)
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',  // Sombra para dar la sensación de flotación
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,  // Añade elevación en Android
  },
});

export default CustomTabBarButton;
