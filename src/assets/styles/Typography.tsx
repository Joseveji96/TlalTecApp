import { useFonts } from 'expo-font';
import { Poppins_200ExtraLight, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export const Typography = () => {
  return useFonts({
    Poppins_200ExtraLight, 
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
};

export const PoppinsMedium = 'Poppins_500Medium';
export const PoppinsSemiBold = 'Poppins_600SemiBold';
export const PoppinsBold = 'Poppins_700Bold';