const { inquirerMenu, leerInput, pausa } = require("./helpers/inquirer");
const { Busquedas } = require("./models/busquedas");
require('colors');

const main = async() =>{
    let opt;
    const busquedas =  new Busquedas()
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //pedir datos
                const lugar = await leerInput('Ingrese el nombre de la ciudad:')
                //buscar los lugares
                await busquedas.ciudad(lugar)
                //para peticiones http se usa axios para node
                //seleccionar el lugar

                //datos del clima

                //mostrar resultados
                console.log('\ninformacion de la ciudad '.green)
                console.log('Ciudad: ');
                console.log('Lat: ')
                console.log('Lng: ')
                console.log('Temperatura: ')
                console.log('Minima')
                console.log('Maxima')
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