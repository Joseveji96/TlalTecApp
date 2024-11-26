import { API_KEY, current_url, forecast_url } from "../constantes";

const baseUrl = forecast_url;
const baseUrl2 = current_url;

export function getForecast(lat: number, lon: number, units: string = "metric", lang: string = "es", appid: string = API_KEY): Promise<Response> {
    const url = `${baseUrl}lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${appid}`
    return fetch(
        url,
        {
            method: 'get',
            
        }
    );
}

export function getWeather(lat: number, lon: number, units: string = "metric", lang: string = "es", appid: string = API_KEY): Promise<Response> {
    const url = `${baseUrl2}lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${appid}`
    return fetch(
        url,
        {
            method: 'get',
            
        }
    );
}