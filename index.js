require('dotenv').config();
const { inquirerMenu, leerInput, pausa, listarLugares } = require("./helpers/inquirer");
const { Busquedas } = require("./models/busquedas");
require('colors');


const main = async() =>{
    let opt;
    const busquedas =  new Busquedas()
    do {
        console.clear()
        
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //pedir datos
                const ciudadBuscar = await leerInput('Ingrese el nombre de la ciudad:')

                //buscar los lugares
                const lugares = await busquedas.ciudad(ciudadBuscar)

                //para peticiones http se usa axios para node
                //seleccionar el lugar
                const id = await listarLugares(lugares)
                const lugarSeleccionado = lugares.find(lugar => lugar.id == id)
                //datos del clima

                const climaData = await busquedas.clima(lugarSeleccionado.lat, lugarSeleccionado.lng)
                
                //mostrar resultados
                //las temperaturas estan en grados kelvin
                console.log('\ninformacion de la ciudad '.green)
                console.log('Ciudad: ', lugarSeleccionado.nombre);
                console.log('Lat: ', lugarSeleccionado.lat)
                console.log('Lng: ', lugarSeleccionado.lng)
                console.log('Temperatura: ', climaData.main.temp)
                console.log('Minima: ',climaData.main.temp_min)
                console.log('Maxima: ', climaData.main.temp_max)
                break;
        
            case 2:
                console.log('soy Historial')
                break;

            default:
                break;
        }
        if(opt !== 0) await pausa();
    } while (opt !== 0);
}

main()