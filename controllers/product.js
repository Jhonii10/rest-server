const { response, request } = require("express");
const { Product } = require("../models");
const category = require("../models/category");
const { body } = require("express-validator");


const obtenerProductos = async ( req = request , res = response ) => {

    const {desde = 0 , limite = 5} = req.query;
    const query = { status: true };


    try {

        const productos = await Product.find(query).populate("user", "name")
        .skip(Number(desde))
        .limit(Number(limite));

        const totalProductos = await Product.countDocuments(query);

        return res.status(200).json({
            totalProductos,
            productos
        })

    } catch (error) {
        return res.status(400).json({
            msg: 'Error al obtener categorias',
        })
    }

}


const ObtenerProducto = async ( req = request , res = response) => {

    const {id} = req.params;
    
    try {
        
        const producto = await Product.findById(id).populate("user", "name");

        if (!producto) {
            return res.status(404).json({
                msg: 'producto no encontrado',
            })
        }

        res.status(200).json({
            producto
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'Error al obtener el producto',
        })
    }

}


const crearProducto = async (req, res = response) => {

    const name = req.body.name.trim().toUpperCase();

    const productDB = await  Product.findOne({name});
    
    try {
        
    
    if (productDB) {
        return res.status(400).json({
            success: false,
            msg: `El producto con el nombre: ${name}, ya existe`,
        })
    }

    const data = {
        ...req.body,
        name,
        user: req.user._id,

    }

    const product = new Product(data);

    await product.save();

    res.status(201).json({
        msg: 'El producto se creo con exito',
        success: true,
        product
    })

    } catch (error) {
        console.log(error);
        
    return res.status(500).json({
        msg: 'Error al crear el producto',

    })
            
    }

}


const actualizarProducto = async ( req = request , res = response) => {

    const {id} = req.params;
    const {_id, __v, estado, user, ...rest} = req.body;
     
    try {
        
        const productoId = await Product.findById(id)

        
        rest.name = rest.name.toUpperCase();
        rest.user = req.user._id;
        

        if (!productoId) {
            return res.status(404).json({
                msg: 'Categoria no encontrada',
            })
        }

         const categoria = await Product.findByIdAndUpdate(id, rest,  {new: true});
           
        res.json({
            message: 'Producto actualizado exitosamente',
            categoria
        })

    } catch (error) {
        return res.status(400).json({
            msg: 'Error al actualizar producto',
        })
    }



}

const borrarProducto = async (req = request , res = response) => {

    const {id} = req.params;

    try {
        
        const deleteID = await Product.findByIdAndUpdate(id, {status : false}, {new: true});
        
        res.json({
            message: 'producto eliminado exitosamente',
            deleteID
        })

    } catch (error) {
        return res.status(400).json({
            msg: 'Error al eliminar producto',
        })
    }
}

module.exports = {
    obtenerProductos,
    ObtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto

}