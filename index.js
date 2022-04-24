

const {inquirerMenu,pausa, leerInput, listarLugares} = require('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas.js');


const main = async () => {
   
    let opt

    const busquedas = new Busquedas();
    do {

        opt = await inquirerMenu();
        console.log(opt)

        switch (opt) {
            case 1:
                const leer = await leerInput('Ciudad: ')
                const lugares =  await busquedas.ciudad(leer);
                const id = await listarLugares(lugares);

                const lugarSeleccionado = lugares.find(l => l.id = id);

                // console.log('Lugar Seleccionado', lugarSeleccionado);

                const {temp, temp_max,temp_min} = await busquedas.climaLugar(lugarSeleccionado.lat,lugarSeleccionado.lng)
                

                console.log('Ciudad:',lugarSeleccionado.name );
                console.log('Latitud', lugarSeleccionado.lat);
                console.log('Longitud',  lugarSeleccionado.lng)
                console.log('Temperatura:' ,temp);
                console.log('Temperatura maxima:' , temp_max),
                console.log('Temperatura minina: ' , temp_min);
                
                break;
            
        
            default:
                break;
        }



         if(opt != 0) await pausa();
    } while (opt != 0);
}

main()