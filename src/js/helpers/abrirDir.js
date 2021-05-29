const mostrarArchivos = require("./mostrarArchivos");

// funcion para abrir una carpeta
const abrirDir = ( dir ) =>{
    const archivos = fs.readdirSync( dir );
    cuerpoTabla.innerHTML = '';

    mostrarArchivos( archivos );
}


module.exports = abrirDir;