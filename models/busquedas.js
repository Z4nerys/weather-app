const axios = require("axios");

//const apikey = 'pk.eyJ1IjoiemFuZXJ5cyIsImEiOiJjbDFsMm5wajUwNXF4M2RtbXgzenpocTZhIn0.Sx_9v-p-cTPF2nDeYeCPCA'

class Busquedas {
    historial = ['tegucigalpa', 'Madrid', 'Bogota'];

    constructor() {
        //TODO: leer DB si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async clima(lat, lng){
        const datos = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}&units=metric&lang=es`)
        return datos.data
    }

    async ciudad(lugar = '') {
        //peticion http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })
            const resp = await instance.get();
            return resp.data.features.map( lugar =>({
                //si uso llaves paretensis y llaves. significa que voy a regresar un objeto de forma implicita
                //es como crear un objeto nuevo con los datos que obtengo de la respuesta
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

        } catch (error) {
            console.log('error: ' + error)
            return [] //retornar los lugares que coincidan
        }
    }

}

module.exports = {
    Busquedas
}