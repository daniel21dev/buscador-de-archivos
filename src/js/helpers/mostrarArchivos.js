
const mostrarArchivos = archivos =>{
    archivos.forEach( archivo =>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="hover:bg-green-400 hover:text-white cursor-pointer border-b border-gray-500" >${ archivo }</td>`
        cuerpoTabla.appendChild( tr );
    });
}

module.exports = mostrarArchivos;