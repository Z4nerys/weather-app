const fs = require('fs');
const axios = require("axios");


//const apikey = 'pk.eyJ1IjoiemFuZXJ5cyIsImEiOiJjbDFsMm5wajUwNXF4M2RtbXgzenpocTZhIn0.Sx_9v-p-cTPF2nDeYeCPCA'

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        //TODO: leer DB si existe
        this.leerDB()
    }

    get historialCapitalizado(){
        return this.historial.map((lugar, i) =>{
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))
            return palabras.join(' ')
        })
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather(){
        return  {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
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
            return resp.data.features.map(lugar => ({
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

    async clima(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsWeather, lat, lon}
            })
            //(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=
            //${process.env.OPENWEATHER_KEY}&units=metric&lang=es`)
            const resp = await instance.get();
            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp:  resp.data.main.temp
            }

        } catch (error) {
            console.log('error: ' , error)
            return {}
        }
    }

    agregarHistorial(lugar =''){

        if(!this.historial.includes(lugar.toLocaleLowerCase())){
            this.historial.unshift(lugar.toLocaleLowerCase())
        }
        //asi borro del array cuando se pasa de 6 elementos
        if(this.historial.length >6){
            this.historial.pop()
        }
        //o puedo dejarlo grabado en el array pero cuando muestro, lo limito a que muestre 6. asi
        //this.historial = this.historial.splice(0, 6)
        //si dejo esta linea aca se actualiza solo si hago una busqueda pero si lo pongo en leerDB. apenas inicie la app ya me muestra 2
        //grabar bd
        this.guardarDB()
    }
    
    guardarDB(){
        const payload ={
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }
    
    leerDB(){
        if(!fs.existsSync(this.dbPath)) return null
        
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
        const data = JSON.parse(info)
        this.historial = data.historial
        //esta linea de abajo es para mostrar un limite de 2 en el historial
        //this.historial = this.historial.splice(0, 2)
    }
    
}

module.exports = {
    Busquedas
}