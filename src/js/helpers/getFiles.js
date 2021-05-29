const fs = require('fs'); 

// obtiene todos los archivos dentro de una unidad
function getFiles ( dir, files_ ){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    // itera cada archivo si es carpeta se hace recursion
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            const nameArr = name.split('/');
            nameArr.shift();
            console.log( nameArr.join('/') );
            files_.push( nameArr.join('/') );
        }
    }
    return files_;
}

module.exports = getFiles;