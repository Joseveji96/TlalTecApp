import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, TouchableOpacity, Image } from 'react-native';
import COLORS from '../../App/Constants/Color';

interface TextInputTLProps extends TextInputProps {
  leftIcon?: any; 
  rightIcon?: any; 
  rightIconOff?: any;
}
// Este nuevo componente tiene la posivilidad de asignar un icono a la izquierda si se prefiere, o a la derecha y este tendra la posibilidad de cambiar de estado
// Simplemente agregando dos fotos o iconos
//El uso completo seria
//<TextInputTLv placeholder="" leftIcon={require('la imagen de un candado')} rightIcon={require('la imagen de ojito')} rightIconOff={require('la imagen de ojito off')} />
//Pueden o no agregar las imagenes, depende de lo que se quiera lograr

const TextInputTL: React.FunctionComponent<TextInputTLProps> = ({ leftIcon, rightIcon, rightIconOff, ...props }) => {
  const [isFocused, setFocused] = useState<boolean>(false);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);

  return (
    <View style={{
      width: "100%",
      height: 56,
      borderColor: isFocused ? COLORS.gray : COLORS.gray2,
      borderWidth: isFocused ? 2 : 1,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: leftIcon ? 50 : 22, 
      paddingRight: rightIcon ? 50 : 22 
    }}>
      {leftIcon && (
        <Image source={leftIcon} style={{ position: 'absolute', left: 12, height: 24, width: 24 }} />
      )}
      <TextInput
        placeholderTextColor={COLORS.gray}
        style={{
          width: "100%",
          fontFamily: "Poppins_500Medium",
          fontSize: 15
        }}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        secureTextEntry={!rightIcon ? props.secureTextEntry : !isPasswordShow}
      />
      {rightIcon && (
        <TouchableOpacity onPress={() => setIsPasswordShow(!isPasswordShow)} style={{ position: 'absolute', right: 12 }}>
          {isPasswordShow ? (
            <Image source={rightIcon} style={{ height: 24, width: 24 }} />
          ) : (
            <Image source={rightIconOff} style={{ height: 24, width: 24 }} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

export default TextInputTL;

const styles = StyleSheet.create({});
