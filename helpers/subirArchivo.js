const path = require('path');
const { v4 : uuid} = require('uuid');

const subirArchivo = (files , extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '') => {

    
    return new Promise((resolve , reject) => {

        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];


        if (!extensionesValidas.includes(extension)) {
            return reject(`la extension ${extension} no es permitida: ${extensionesValidas}`);
        }

        const nombreTemp = uuid() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            };

            resolve( nombreTemp);
        })

    })

}


module.exports = {
    subirArchivo
}