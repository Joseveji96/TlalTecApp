import { base_url } from "../constantes";
import { prepareToken } from "../token.utils";
import { CreateHuertoRecuest, Huertos } from "./models/huerto.models";
const baseUrl = base_url;

export function getHuertosById(idHuerto: string, token: string): Promise<Response> {
    const url = `${baseUrl}huertos/${idHuerto}`
    return fetch(
        url,
        {
            method: 'get',
            headers: {
                "Authorization": prepareToken(token)
            }
        }
    );
}

export function getHuertosByIdUser(idUser: String, token: string): Promise<Response> {
    const url = `${baseUrl}huertos/byuserid/${idUser}`
    return fetch(
        url,
        {
            method: 'get',
            headers: {
                "Authorization": prepareToken(token)
            }
        }
    );
}

export function createHuerto(huerto: CreateHuertoRecuest, token: string): Promise<Response> {
    const url = `${baseUrl}huertos/`
    return fetch(
        url,
        {
            method: 'post',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": prepareToken(token)
            },
            body: JSON.stringify(huerto)
        }
    );
}

export function editHuerto(huerto: Huertos, token: string): Promise<Response> {
    const url = `${baseUrl}huertos/`
    delete huerto.__v;
    return fetch(
        url,
        {
            method: 'patch',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": prepareToken(token)
            },
            body: JSON.stringify(huerto)
        }
    );
}

export function deleteHuerto(idHuerto: string, token: string): Promise<Response> {
    const url = `${baseUrl}huertos/${idHuerto}`
    return fetch(
        url,
        {
            method: 'delete',
            headers: {
                "Authorization": prepareToken(token)
            }
        }
    );
}

