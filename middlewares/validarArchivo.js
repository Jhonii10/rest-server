const { response } = require("express");


const validarArchivo = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No hay archivos que subir'});
    }

    next();

}


module.exports = {
    validarArchivo
}