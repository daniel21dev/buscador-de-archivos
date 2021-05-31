// modulos
const fs = require('fs');
const open = require('open');
const dl = require('drivelist');

const abrirDir = require('./js/helpers/abrirDir');
const { mostrarBusquedas, guardarBusquedas } = require('./js/helpers/busquedas');
const getFiles = require('./js/helpers/getFiles');
const mostrarArchivos = require('./js/helpers/mostrarArchivos');
// elementos HTML
const listaUnidades = document.querySelector('#unidades-list');
const cuerpoTabla = document.querySelector('#tabla-cuerpo');
const btnBuscar = document.querySelector('#btn-buscar');
const listaBusquedas = document.querySelector('#busquedas');
const barraBusqueda = document.querySelector('#buscar');

// variables globales
const letras = 'A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z '.split(' ');
let unidades = [];
let archivosUnidad = [];
let currentDir = '/';
let busquedas = [];

fetch('./db/db.json')
    .then( res => res.json() )
    .then( data => busquedas = data.busquedas )

// filtrar unidades 
unidades = letras.filter( letra => {
    try {
        if( !!fs.readdirSync(`${letra}:/`) && (letra !== 'C') ){
            return `${letra}:/`
        }
    } catch (error) {}
});
// lista las unidades disponibles
unidades.forEach( unidad =>{
    const li = document.createElement('li');
    li.innerText = unidad;
    li.classList.add('p-4','hover:bg-gray-50','cursor-pointer','hover:bg-purple-300');
    listaUnidades.appendChild( li );
})
// escucha cuando se hace click en una unidad
listaUnidades.addEventListener('click',(e)=>{
    console.log('click');
    try {
        currentDir = `${ e.target.innerText }:/`;
        abrirDir( currentDir );
        archivosUnidad = getFiles( currentDir );
    } catch (error) {
        
    }
});

// escucha cuando se hace click en un archivo o carpeta
cuerpoTabla.addEventListener('click', (e)=>{
    if( fs.statSync( `${ currentDir }/${e.target.innerText }` ).isFile() ){
        return open(`${ currentDir }/${e.target.innerText }`);
    }
    if( fs.statSync( `${ currentDir }/${e.target.innerText }` ).isDirectory() ){
        currentDir = `${ currentDir }/${e.target.innerText }`
        return abrirDir( currentDir );
    }
})

// acciona la busqueda
btnBuscar.addEventListener('click', (e)=>{
    // revisa si no a seleccionado una unidad
    if( currentDir === '/'){
        alert('seleccione una unidad antes de buscar ');
    }
    const busqueda = document.querySelector('#buscar');
    // resetea la tabla
    cuerpoTabla.innerHTML = '';
    // filtra los archvios de la unidad 
    const archivosBusqueda = archivosUnidad.filter( archivo => archivo.includes( busqueda.value ) );
    mostrarArchivos( archivosBusqueda );

    listaBusquedas.innerHTML = '';
    busquedas = guardarBusquedas( busquedas, busqueda.value )
})


barraBusqueda.addEventListener('focus',()=>{
    mostrarBusquedas( busquedas );
    listaBusquedas.style.display = 'block';
});

barraBusqueda.addEventListener('blur',()=>{
    listaBusquedas.innerHTML = '';
    listaBusquedas.style.display = 'none';
});


