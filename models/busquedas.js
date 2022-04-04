const axios = require("axios");

class Busquedas {
    historial = ['tegucigalpa', 'Madrid', 'Bogota'];

    constructor(){
        //TODO: leer DB si existe
    }

    async ciudad( lugar='' ){
        //peticion http
        try {
            const resp = await axios.get('https://reqres.in/api/users?page=2')
            console.log(resp.data)
            return []
            
        } catch (error) {
            console.log('error: ' +error)
            return [] //retornar los lugares que coincidan
        }
    }

}

module.exports ={
    Busquedas
}