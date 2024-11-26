export interface HuertosResponse {
    huertos: Huertos;
    token:    string;
}

export interface Huertos {
    id_Usuario:      string;
    Nombre:          string;
    Latitud:         number;
    Longitud:        number;
    Organico:        string;
    EtapaFenologica: string;
    _id:             string;
    __v?:            number;
}

export interface CreateHuertoRecuest {
    id_Usuario:      string;
    Nombre:          string;
    Latitud:         number;
    Longitud:        number;
    Organico:        string;
    EtapaFenologica: string;
}

export interface HuertosList {
    huertos:  any[];
    token:   string;
}
