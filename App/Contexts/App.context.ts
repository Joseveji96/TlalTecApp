import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Huertos } from "../../src/servises/huertos/models/huerto.models";
import { User } from "../../src/servises/auth/models/auth.models";

type AppContextData = {
    usuario: User;
    setUsuario: Dispatch<SetStateAction<User>>;
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    refreshHuerto: boolean;
    setRefreshHuerto: Dispatch<SetStateAction<boolean>>;
    huerto: Huertos;
    setHuerto: Dispatch<SetStateAction<Huertos>>;
}

export const appContext = createContext<AppContextData>({ usuario: ({} as User), setUsuario: ()=>{}, token: '', setToken: ()=>{}, refreshHuerto: false, setRefreshHuerto: (()=>{}), huerto: ({} as Huertos), setHuerto: () => {} });

export const useAppContext = () => useContext(appContext);