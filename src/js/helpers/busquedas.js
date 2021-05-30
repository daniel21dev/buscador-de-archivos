
const mostrarBusquedas = ( busquedas ) =>{
    busquedas.forEach( busqueda =>{
        const li = document.createElement('li');
        li.classList.add('cursor-pointer','hover:bg-green-300');
        li.innerText = busqueda;
        listaBusquedas.appendChild( li );
    })
}

const guardarBusquedas = ( busquedas=[], nuevaBusqueda ) =>{
    busquedas.push( nuevaBusqueda );
    localStorage.setItem('busquedas', JSON.stringify( busquedas ));
    return busquedas;
}


module.exports = {
    mostrarBusquedas,
    guardarBusquedas
};