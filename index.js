require('dotenv').config();
const { inquirerMenu, leerInput, pausa, listarLugares } = require("./helpers/inquirer");
const { Busquedas } = require("./models/busquedas");
require('colors');


const main = async () => {
    let opt;
    const busquedas = new Busquedas()
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
                if (id === 0) continue;

                const lugarSeleccionado = lugares.find(lugar => lugar.id == id)
                //guardar en db
                busquedas.agregarHistorial(lugarSeleccionado.nombre)
                console.clear()
                console.log('-----------------LOADING-----------------'.red)
                //datos del clima
                const { desc, min, max, temp } = await busquedas.clima(lugarSeleccionado.lat, lugarSeleccionado.lng)
                //mostrar resultados
                console.clear()
                //las temperaturas estan en grados kelvin
                console.log('informacion de la ciudad '.green)
                console.log('\nCiudad: ', lugarSeleccionado.nombre.green);
                console.log('Lat: ', lugarSeleccionado.lat)
                console.log('Lng: ', lugarSeleccionado.lng)
                console.log('Temperatura: ', temp)
                console.log('Minima: ', min)
                console.log('Maxima: ', max)
                console.log('Cielo: ', desc.green)
                break;

            case 2:
                console.log()
                busquedas.historialCapitalizado.forEach((lugar, i)=>{
                    console.log(`${1+i}. `.green + lugar)
                })
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0);
}

main()