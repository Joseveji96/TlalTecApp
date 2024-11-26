import { Forecast } from '../OpenWeather/models/weather.models';

// Constante que representa la cantidad de segundos en una hora
const hourInSeconds = 3600;

// 
// DEFINICIÓN DE CLASES CON LAS CONDICIONES PARA CADA PLAGA/ENFERMEDAD
// 

class Cancer {
    public static readonly nombre: string = "Cancer o Cancro"
    public static readonly tempMin: number = 18;
    public static readonly tempMax: number = 999;
    public static readonly humedadRelativaMin: number = 80;
    public static readonly humedadRelativaMax: number = 100;
    public static readonly horasPrediccion: number = 72;
}

class Antracnosis {
    public static readonly nombre: string = "Antracnosis"
    public static readonly tempMin: number = 18;
    public static readonly tempMax: number = 30;
    public static readonly humedadRelativaMin: number = 80;
    public static readonly humedadRelativaMax: number = 100;
    public static readonly horasPrediccion: number = 24;
}

class Viroide {
    public static readonly nombre: string = "Viroide"
    public static readonly tempMin: number = 10;
    public static readonly tempMax: number = 14;
    public static readonly humedadRelativaMin: number = 80;
    public static readonly humedadRelativaMax: number = 100;
    public static readonly horasPrediccion: number = 6;
}

class Gusano {
    public static readonly nombre: string = "Gusano telarañero o Enrollador de Hoja"
    public static readonly tempMin: number = -999;
    public static readonly tempMax: number = 15;
    public static readonly humedadRelativaMin: number = 60;
    public static readonly humedadRelativaMax: number = 100;
    public static readonly horasPrediccion: number = 120;
}

// 
// DEFINICIÓN DE LA FUNCIÓN DE PREDICCIÓN
// 

/**
 * 
 * @param forecast Es la respuesta de la API de OpenWeather
 * @param clase Esta es la clase que será evaluada, en caso de agregar más clases, entonces agreguenlas separadas por un '|' y con la instrucción 'typeof'
 * @returns el nombre de la plaga o enfermedad si hay posible presencia en los proximos días, devolvera un string vació en caso de no cumplir con las condiciones
 */
async function predict(forecast:Forecast, clase: typeof Cancer| typeof Antracnosis| typeof Viroide| typeof Gusano): Promise<string> {
    // Está linea calcula el limite de tiempo basado en las horas en consideración para la predicción, 
    // el inicio se toma del primer elemento del arreglo de predicciones
    const timeLimit = forecast.list[0].dt + hourInSeconds * clase.horasPrediccion!;

    // Con esta linea se filtran únicamente los datos necesarios para el análisis
    const registrosNecesarios = forecast.list.filter((fItem) => fItem.dt <= timeLimit);


    // Calculando la temperatura y humedad promedio dentro del tiempo de analisis
    const tempPromedio = registrosNecesarios.map(reg => reg.main.temp).reduce((prevTemp, nextTemp) => prevTemp + nextTemp, 0) / registrosNecesarios.length;
    const humedadPromedio = registrosNecesarios.map(reg => reg.main.humidity).reduce((prevHum, nextHum) => prevHum + nextHum, 0) / registrosNecesarios.length;

    // Evaluando las condiciones esperadas con las necesitadas para la plaga/enfermedad
    if (tempPromedio <= clase.tempMax && tempPromedio >= clase.tempMin && humedadPromedio <= clase.humedadRelativaMax && humedadPromedio >= clase.humedadRelativaMin) {
        return clase.nombre;
    }

    return '';
}


// FUNCIÓN QUE ES EXPORTADA PARA USO EN CUALQUIER OTRO COMPONENTE

/**
 * 
 * @param forecast La respuesta de la API de OpenWeather
 * @returns una Promesa que incluye la lista de enfermedades que pudieran generarse son las condiciones climáticas esperadas en los próximos días
 */
export async function predecirAlertas(forecast: Forecast): Promise<string[]> {
    // Arreglo de las clases que representan las plagas y enfermedades,
    // En caso de agregar más sigan el mismo formato de las clases de arriba y agreguenlas al arreglo
    const plagasEnfermedades = [Cancer, Antracnosis, Viroide, Gusano]

    // Arreglos de resultados
    const resultados: Promise<string>[] = []; 
    for (let pe of plagasEnfermedades) {
        resultados.push(predict(forecast, pe));
    }

    // resuelve todas las promesas y obtiene únicamente el resultado en string
    const alertasPronosticadas = await Promise.all(resultados);

    // Se filtran los resultados para no incluir string vacios
    return alertasPronosticadas.filter(pe => pe.length);
}