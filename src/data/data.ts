import { AnimationObject } from "react-native-reanimated";

export interface OnboardingData{
    id: number;
    animation: AnimationObject;
    text: string;
    textColor: string;
    backgroundColor: string;
}

const data: OnboardingData[] = [
    {
        id: 1,
        animation: require('../assets/animations/A1.json'),
        text: 'Welcome',
        textColor: '#005b4f',
        backgroundColor: '#ffa3ce',
    },
];