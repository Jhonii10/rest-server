const { response } = require("express");
const { subirArchivo } = require("../helpers/subirArchivo");


const cargarArchivo = async( req, res = response) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'No hay archivos que subir'});
    }

    const path = await subirArchivo(req.files);

    res.json({
        path
    })
}


module.exports = {
    cargarArchivo
}