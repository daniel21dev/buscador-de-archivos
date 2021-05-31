
const mostrarArchivos = archivos =>{

    if( archivos.length < 1){
        const tr = document.createElement('tr');
        tr.classList.add('bg-green-300');
        tr.innerText = 'archivo no encontrado, verifique su busqueda';
        return cuerpoTabla.appendChild( tr );
    }

    archivos.forEach( archivo =>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="hover:bg-green-400 hover:text-white cursor-pointer border-b border-gray-500" >${ archivo }</td>`
        cuerpoTabla.appendChild( tr );
    });
}

module.exports = mostrarArchivos;