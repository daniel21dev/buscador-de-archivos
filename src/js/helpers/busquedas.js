const fs = require('fs');
const path = require('path');

const mostrarBusquedas = ( busquedas, listaBusquedas ) =>{

    if( busquedas.length < 1){
        const li = document.createElement('li');
        li.classList.add('bg-green-300');
        li.innerText = 'archivo no encontrado, verifique su busqueda';
        return listaBusquedas.appendChild( li );
    }

    busquedas.forEach( busqueda =>{
        const li = document.createElement('li');
        li.classList.add('cursor-pointer','hover:bg-green-300');
        li.innerText = busqueda;
        listaBusquedas.appendChild( li );
    })
}

const guardarBusquedas = ( busquedas , nuevaBusqueda ) =>{
    if( !busquedas.includes( nuevaBusqueda ) ){
        busquedas.push( nuevaBusqueda );
        fs.writeFileSync( path.join(__dirname,'../../db/db.json'), JSON.stringify({ busquedas }) );
        return busquedas;
    }
}



module.exports = {
    mostrarBusquedas,
    guardarBusquedas
};