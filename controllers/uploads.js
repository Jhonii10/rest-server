const path = require('path');
const fs   = require('fs');

const cloudinary =  require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require("express");
const { subirArchivo } = require("../helpers/subirArchivo");
const { User, Product } = require("../models");




const cargarArchivo = async( req, res = response) =>{

    try {

        const path = await subirArchivo(req.files);
    
        res.json({
            path
        })
        
    } catch (error) {
        res.json({error})
    }

}

const actualizarImagen = async (req, res = response) => {

    const {id , coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
        modelo = await User.findById(id);
        if (!modelo) {
            return res.status(404).json({msg: `No existe el usuario con id ${id}`});
        }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(404).json({msg: `No existe el producto con id ${id}`});
            }
            break;
            
    
        default:
            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            })
    }

    if (modelo.img) {
        
        const pathImage = path.join(__dirname, '../uploads', coleccion , modelo.img);

        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    modelo.img = await subirArchivo(req.files , undefined , coleccion);

    await modelo.save();

    res.json({
        modelo
    })


}

const actualizarImagenCloudinary = async (req, res = response) => {

    const {id , coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
        modelo = await User.findById(id);
        if (!modelo) {
            return res.status(404).json({msg: `No existe el usuario con id ${id}`});
        }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(404).json({msg: `No existe el producto con id ${id}`});
            }
            break;
            
    
        default:
            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            })
    }

    if (modelo.img) {
        
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');

        cloudinary.uploader.destroy(`cafe-api/${coleccion}/${public_id}`);

    }

    const { tempFilePath } = req.files.archivo;

    const resp = await cloudinary.uploader.upload(tempFilePath, {
        folder : `cafe-api/${coleccion}`
    })

    const {secure_url} = resp;

    modelo.img = secure_url

    await modelo.save();

    res.json({
        modelo
    })


}


const mostrarImagen = async ( req, res = response ) => {

    const {id , coleccion } = req.params;

    let modelo;

    
    

    switch (coleccion) {
        case 'users':
        modelo = await User.findById(id);
        if (!modelo) {
            return res.status(404).json({msg: `No existe el usuario con id ${id}`});
        }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(404).json({msg: `No existe el producto con id ${id}`});
            }
            break;
            
    
        default:
            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            })
    }

   

    if (modelo.img) {
        
        const pathImage = path.join(__dirname, '../uploads', coleccion , modelo.img);

        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }



    res.sendFile(path.join(__dirname, '../assets/no-image.jpg'))

}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}