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

    async ciudad(lugar = '') {
        //peticion http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })
            const resp = await instance.get();
            console.log(resp.data.features)
            return []

        } catch (error) {
            console.log('error: ' + error)
            return [] //retornar los lugares que coincidan
        }
    }

}

module.exports = {
    Busquedas
}